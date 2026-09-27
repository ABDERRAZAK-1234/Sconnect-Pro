const activiteRepository = require("../repositories/activiteRepository");
const parseBody = require("../utils/bodyParser");
const render = require("../core/renderer");

const getActivites = async (req, res) => {
    try {
        const activites = await activiteRepository.findAll();

        await render(res, "pages/activites/index", {
            title: "Activités",
            activites
        });

    } catch (error) {
        console.error("Erreur récupération activités :", error);

        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur lors de la récupération des activités");
    }
};

const getActiviteById = async (req, res, params) => {
    try {
        const id = Number(params.id);

        const activite = await activiteRepository.findById(id);

        if (!activite) {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("Activité introuvable");
        }

        await render(res, "pages/activites/detail", {
            title: activite.nom,
            activite
        });

    } catch (error) {
        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur serveur");
    }
};

const showCreateActivite = async (req, res) => {
    await render(res, "pages/activites/create", {
        title: "Créer une activité"
    });
};

const showEditActivite = async (req, res, params) => {
    try {
        const id = Number(params.id);

        if (!id || id <= 0) {
            res.writeHead(400, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("ID invalide");
        }

        const activite = await activiteRepository.findById(id);

        if (!activite) {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("Activité introuvable");
        }

        await render(res, "pages/activites/edit", {
            title: `Modifier ${activite.nom}`,
            activite
        });

    } catch (error) {
        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur serveur");
    }
};

const createActivite = async (req, res) => {
    try {
        const body = await parseBody(req);

        const data = {
            nom: body.nom,
            prix_base: Number(body.prix_base),
            capacite_max: Number(body.capacite_max),
            categorie_age: body.categorie_age || null,
            jour_semaine: body.jour_semaine,
            heure_debut: body.heure_debut,
            heure_fin: body.heure_fin,
            type_public: body.type_public || null,
            association_id: Number(body.association_id),
            infrastructure_id: Number(body.infrastructure_id)
        };

        await activiteRepository.create(data);

        res.writeHead(303, {
            "Location": "/activites"
        });

        res.end();

    } catch (error) {
        res.writeHead(400, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end(error.message);
    }
};

const updateActivite = async (req, res, params) => {
    try {
        const id = Number(params.id);

        const body = await parseBody(req);

        const activite = await activiteRepository.update(id, body);

        if (!activite) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: false,
                message: "Activité introuvable"
            }));
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            message: "Activité modifiée avec succès",
            data: activite
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

const deleteActivite = async (req, res, params) => {
    try {
        const id = Number(params.id);

        const activite = await activiteRepository.remove(id);

        if (!activite) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: false,
                message: "Activité introuvable"
            }));
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            message: "Activité supprimée avec succès",
            data: activite
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
    getActivites,
    getActiviteById,
    showCreateActivite,
    showEditActivite,
    createActivite,
    updateActivite,
    deleteActivite
};