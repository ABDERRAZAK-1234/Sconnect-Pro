const paiementRepository = require("../repositories/paiementRepository");
const parseBody = require("../utils/bodyParser");
const render = require("../core/renderer");

const getPaiements = async (req, res) => {
    try {
        const paiements = await paiementRepository.findAll();

        await render(res, "pages/paiements/index", {
            title: "Paiements",
            paiements
        });

    } catch (error) {
        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur lors de la récupération des paiements");
    }
};

const getPaiementById = async (req, res, params) => {
    try {
        const id = Number(params.id);

        const paiement = await paiementRepository.findById(id);

        if (!paiement) {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("Paiement introuvable");
        }

        await render(res, "pages/paiements/detail", {
            title: `Paiement #${paiement.id}`,
            paiement
        });

    } catch (error) {
        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur serveur");
    }
};

const showCreatePaiement = async (req, res) => {
    await render(res, "pages/paiements/create", {
        title: "Créer un paiement"
    });
};

const showEditPaiement = async (req, res, params) => {
    try {
        const id = Number(params.id);

        if (!id || id <= 0) {
            res.writeHead(400, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("ID invalide");
        }

        const paiement = await paiementRepository.findById(id);

        if (!paiement) {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("Paiement introuvable");
        }

        await render(res, "pages/paiements/edit", {
            title: `Modifier paiement #${paiement.id}`,
            paiement
        });

    } catch (error) {
        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur serveur");
    }
};

const createPaiement = async (req, res) => {
    try {
        const body = await parseBody(req);

        const data = {
            inscription_id: Number(body.inscription_id),
            montant: Number(body.montant),
            methode: body.methode,
            nombre_echeances: Number(body.nombre_echeances) || 1,
            statut: body.statut || "en_attente"
        };

        await paiementRepository.create(data);

        res.writeHead(303, {
            "Location": "/paiements"
        });

        res.end();

    } catch (error) {
        res.writeHead(400, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end(error.message);
    }
};

const updatePaiement = async (req, res, params) => {
    try {
        const id = Number(params.id);

        const body = await parseBody(req);

        const paiement = await paiementRepository.update(id, body);

        if (!paiement) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: false,
                message: "Paiement introuvable"
            }));
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            message: "Paiement modifié avec succès",
            data: paiement
        }));

    } catch (error) {
        res.writeHead(400, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: error.message
        }));
    }
};

const deletePaiement = async (req, res, params) => {
    try {
        const id = Number(params.id);

        const paiement = await paiementRepository.remove(id);

        if (!paiement) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: false,
                message: "Paiement introuvable"
            }));
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            message: "Paiement supprimé avec succès",
            data: paiement
        }));

    } catch (error) {
        res.writeHead(400, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: error.message
        }));
    }
};

module.exports = {
    getPaiements,
    getPaiementById,
    showCreatePaiement,
    showEditPaiement,
    createPaiement,
    updatePaiement,
    deletePaiement
};