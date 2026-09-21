const inscriptionRepository = require("../repositories/inscriptionRepository");
const parseBody = require("../utils/bodyParser");

const getInscriptions = async (req, res) => {
    try {
        const inscriptions = await inscriptionRepository.findAll();

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            data: inscriptions
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

const getInscriptionById = async (req, res, params) => {
    try {
        const id = Number(params.id);

        const inscription = await inscriptionRepository.findById(id);

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
            data: inscription
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

const createInscription = async (req, res) => {
    try {
        const body = await parseBody(req);

        const inscription = await inscriptionRepository.create(body);

        res.writeHead(201, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            message: "Inscription créée avec succès",
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
    createInscription,
    updateInscription,
    deleteInscription
};