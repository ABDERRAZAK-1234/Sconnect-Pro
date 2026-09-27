const familleRepository = require("../repositories/familleRepository");
const parseBody = require("../utils/bodyParser");
const render = require("../core/renderer");

const getFamilles = async (req, res) => {
    try {
        const familles = await familleRepository.findAll();

        await render(res, "pages/familles/index", {
            title: "Familles",
            familles
        });

    } catch (error) {
        console.error("Erreur récupération familles :", error);

        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur lors de la récupération des familles");
    }
};

const getFamilleById = async (req, res, params) => {
    try {
        const id = Number(params.id);

        if (!id || id <= 0) {
            res.writeHead(400, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("ID invalide");
        }

        const famille = await familleRepository.findById(id);

        if (!famille) {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("Famille introuvable");
        }

        await render(res, "pages/familles/detail", {
            title: famille.nom_famille,
            famille
        });

    } catch (error) {
        console.error("Erreur récupération famille :", error);

        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur serveur");
    }
};

const showCreateFamille = async (req, res) => {
    await render(res, "pages/familles/create", {
        title: "Créer une famille"
    });
};

const showEditFamille = async (req, res, params) => {
    try {
        const id = Number(params.id);

        if (!id || id <= 0) {
            res.writeHead(400, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("ID invalide");
        }

        const famille = await familleRepository.findById(id);

        if (!famille) {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("Famille introuvable");
        }

        await render(res, "pages/familles/edit", {
            title: `Modifier ${famille.nom_famille}`,
            famille
        });

    } catch (error) {
        console.error("Erreur affichage modification famille :", error);

        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur serveur");
    }
};

const createFamille = async (req, res) => {
    try {
        const body = await parseBody(req);

        const data = {
            nom_famille: body.nom_famille,
            quotient_familial: body.quotient_familial !== undefined && body.quotient_familial !== ""
                ? Number(body.quotient_familial)
                : null
        };

        await familleRepository.create(data);

        res.writeHead(303, {
            "Location": "/familles"
        });

        res.end();

    } catch (error) {
        console.error("Erreur création famille :", error);

        res.writeHead(400, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end(error.message);
    }
};

const updateFamille = async (req, res, params) => {
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

        const famille = await familleRepository.update(id, body);

        if (!famille) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: false,
                message: "Famille introuvable"
            }));
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            data: famille
        }));

    } catch (error) {
        console.error("Erreur modification famille :", error);

        res.writeHead(400, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: error.message
        }));
    }
};

const deleteFamille = async (req, res, params) => {
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

        const famille = await familleRepository.remove(id);

        if (!famille) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: false,
                message: "Famille introuvable"
            }));
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            message: "Famille supprimée avec succès",
            data: famille
        }));

    } catch (error) {
        console.error("Erreur suppression famille :", error);

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
    getFamilles,
    getFamilleById,
    showCreateFamille,
    showEditFamille,
    createFamille,
    updateFamille,
    deleteFamille
};