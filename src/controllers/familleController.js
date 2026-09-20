const familleRepository = require("../repositories/familleRepository");
const parseBody = require("../utils/bodyParser");

const getFamilles = async (req, res) => {
    try {
        const familles = await familleRepository.findAll();

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            data: familles
        }));

    } catch (error) {
        console.error("Erreur récupération familles :", error);

        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: "Erreur serveur"
        }));
    }
};

const getFamilleById = async (req, res, params) => {
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

        const famille = await familleRepository.findById(id);

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
        console.error("Erreur récupération famille :", error);

        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: "Erreur serveur"
        }));
    }
};

const createFamille = async (req, res) => {
    try {
        const body = await parseBody(req);

        const famille = await familleRepository.create(body);

        res.writeHead(201, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            data: famille
        }));

    } catch (error) {
        console.error("Erreur création famille :", error);

        res.writeHead(400, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: error.message
        }));
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
    createFamille,
    updateFamille,
    deleteFamille
};