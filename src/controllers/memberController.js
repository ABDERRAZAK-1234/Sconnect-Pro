const membreRepository = require("../repositories/membreRepository");
const parseBody = require("../utils/bodyParser");
const render = require("../core/renderer");

const getMembres = async (req, res) => {
    try {
        const membres = await membreRepository.findAll();

        await render(res, "pages/membres/index", {
            title: "Membres",
            membres
        });

    } catch (error) {
        console.error("Erreur récupération membres :", error);

        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur lors de la récupération des membres");
    }
};

const getMembreById = async (req, res, params) => {
    try {
        const id = Number(params.id);

        if (!id || id <= 0) {
            res.writeHead(400, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("ID invalide");
        }

        const membre = await membreRepository.findById(id);

        if (!membre) {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("Membre introuvable");
        }

        await render(res, "pages/membres/detail", {
            title: `${membre.prenom} ${membre.nom}`,
            membre
        });

    } catch (error) {
        console.error("Erreur récupération membre :", error);

        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur serveur");
    }
};

const showCreateMembre = async (req, res) => {
    await render(res, "pages/membres/create", {
        title: "Créer un membre"
    });
};

const showEditMembre = async (req, res, params) => {
    try {
        const id = Number(params.id);

        if (!id || id <= 0) {
            res.writeHead(400, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("ID invalide");
        }

        const membre = await membreRepository.findById(id);

        if (!membre) {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("Membre introuvable");
        }

        await render(res, "pages/membres/edit", {
            title: `Modifier ${membre.prenom} ${membre.nom}`,
            membre
        });

    } catch (error) {
        console.error("Erreur affichage modification membre :", error);

        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur serveur");
    }
};

const createMembre = async (req, res) => {
    try {
        const body = await parseBody(req);

        const data = {
            prenom: body.prenom,
            nom: body.nom,
            date_naissance: body.date_naissance,
            famille_id: Number(body.famille_id),
            est_resident: body.est_resident === "true" || body.est_resident === true,
            code_pass_sport: body.code_pass_sport || null,
            date_emission_certificat: body.date_emission_certificat || null,
            date_expiration_certificat: body.date_expiration_certificat || null,
            type_sport_certifie: body.type_sport_certifie || null,
            statut_certificat: body.statut_certificat || null
        };

        await membreRepository.create(data);

        res.writeHead(303, {
            "Location": "/membres"
        });

        res.end();

    } catch (error) {
        console.error("Erreur création membre :", error);

        res.writeHead(400, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end(error.message);
    }
};

const updateMembre = async (req, res, params) => {
    try {
        const id = Number(params.id);

        if (!id || id <= 0) {
            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: false,
                message: "ID invalide"
            }));
        }

        const body = await parseBody(req);

        const membre = await membreRepository.update(id, body);

        if (!membre) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: false,
                message: "Membre introuvable"
            }));
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            data: membre
        }));

    } catch (error) {
        console.error("Erreur modification membre :", error);

        res.writeHead(400, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: error.message
        }));
    }
};

const deleteMembre = async (req, res, params) => {
    try {
        const id = Number(params.id);

        if (!id || id <= 0) {
            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: false,
                message: "ID invalide"
            }));
        }

        const membre = await membreRepository.remove(id);

        if (!membre) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: false,
                message: "Membre introuvable"
            }));
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            message: "Membre supprimé avec succès",
            data: membre
        }));

    } catch (error) {
        console.error("Erreur suppression membre :", error);

        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: "Erreur serveur"
        }));
    }
};

module.exports = {
    getMembres,
    getMembreById,
    showCreateMembre,
    showEditMembre,
    createMembre,
    updateMembre,
    deleteMembre
};