const inscriptionRepository = require("../repositories/inscriptionRepository");
const parseBody = require("../utils/bodyParser");
const render = require("../core/renderer");

const getInscriptions = async (req, res) => {
    try {
        const inscriptions = await inscriptionRepository.findAll();

        await render(res, "pages/inscriptions/index", {
            title: "Inscriptions",
            inscriptions
        });

    } catch (error) {
        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur lors de la récupération des inscriptions");
    }
};

const getInscriptionById = async (req, res, params) => {
    try {
        const id = Number(params.id);

        const inscription = await inscriptionRepository.findById(id);

        if (!inscription) {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("Inscription introuvable");
        }

        await render(res, "pages/inscriptions/detail", {
            title: `Inscription #${inscription.id}`,
            inscription
        });

    } catch (error) {
        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur serveur");
    }
};

const showCreateInscription = async (req, res) => {
    await render(res, "pages/inscriptions/create", {
        title: "Créer une inscription"
    });
};

const showEditInscription = async (req, res, params) => {
    try {
        const id = Number(params.id);

        if (!id || id <= 0) {
            res.writeHead(400, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("ID invalide");
        }

        const inscription = await inscriptionRepository.findById(id);

        if (!inscription) {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("Inscription introuvable");
        }

        await render(res, "pages/inscriptions/edit", {
            title: `Modifier inscription #${inscription.id}`,
            inscription
        });

    } catch (error) {
        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur serveur");
    }
};

const createInscription = async (req, res) => {
    try {
        const body = await parseBody(req);

        const data = {
            membre_id: Number(body.membre_id),
            activite_id: Number(body.activite_id),
            statut: body.statut || "en_attente",
            prix_final: body.prix_final !== undefined && body.prix_final !== ""
                ? Number(body.prix_final)
                : null,
            score_priorite: body.score_priorite !== undefined && body.score_priorite !== ""
                ? Number(body.score_priorite)
                : null
        };

        await inscriptionRepository.create(data);

        res.writeHead(303, {
            "Location": "/inscriptions"
        });

        res.end();

    } catch (error) {
        res.writeHead(400, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end(error.message);
    }
};

const updateInscription = async (req, res, params) => {
    try {
        const id = Number(params.id);

        const body = await parseBody(req);

        const inscription = await inscriptionRepository.update(id, body);

        if (!inscription) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: false,
                message: "Inscription introuvable"
            }));
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            message: "Inscription modifiée avec succès",
            data: inscription
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

const deleteInscription = async (req, res, params) => {
    try {
        const id = Number(params.id);

        const inscription = await inscriptionRepository.remove(id);

        if (!inscription) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: false,
                message: "Inscription introuvable"
            }));
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            message: "Inscription supprimée avec succès",
            data: inscription
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
    getInscriptions,
    getInscriptionById,
    showCreateInscription,
    showEditInscription,
    createInscription,
    updateInscription,
    deleteInscription
};