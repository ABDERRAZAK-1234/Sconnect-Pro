const activiteRepository = require("../repositories/activiteRepository");
const parseBody = require("../utils/bodyParser");

const getActivites = async (req, res) => {
    try {
        const activites = await activiteRepository.findAll();

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            data: activites
        }));

    } catch (error) {
        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: error.message
        }));
    }
};

const getActiviteById = async (req, res, params) => {
    try {
        const id = Number(params.id);

        const activite = await activiteRepository.findById(id);

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
            data: activite
        }));

    } catch (error) {
        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: error.message
        }));
    }
};

const createActivite = async (req, res) => {
    try {
        const body = await parseBody(req);

        const activite = await activiteRepository.create(body);

        res.writeHead(201, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            message: "Activité créée avec succès",
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
    createActivite,
    updateActivite,
    deleteActivite
};