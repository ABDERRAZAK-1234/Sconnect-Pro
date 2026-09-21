const paiementRepository = require("../repositories/paiementRepository");
const parseBody = require("../utils/bodyParser");

const getPaiements = async (req, res) => {
    try {
        const paiements = await paiementRepository.findAll();

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            data: paiements
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

const getPaiementById = async (req, res, params) => {
    try {
        const id = Number(params.id);

        const paiement = await paiementRepository.findById(id);

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
            data: paiement
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

const createPaiement = async (req, res) => {
    try {
        const body = await parseBody(req);

        const paiement = await paiementRepository.create(body);

        res.writeHead(201, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            message: "Paiement créé avec succès",
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
    createPaiement,
    updatePaiement,
    deletePaiement
};