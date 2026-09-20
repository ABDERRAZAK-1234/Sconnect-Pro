const parseBody = require("../utils/bodyParser");
const infrastructureRepository = require("../repositories/infrastructureRepository");

const getFacilities = async (req, res) => {
    try {
        const facilities = await infrastructureRepository.findAll();

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            data: facilities
        }));

    } catch (error) {
        console.error("Erreur récupération infrastructures :", error);

        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: "Erreur serveur"
        }));
    }
};

const getFacilityById = async (req, res, params) => {
    try {
        console.log("PARAMS:", params);

        const id = Number(params.id);

        console.log("ID:", id);

        const facility = await infrastructureRepository.findById(id);

        if (!facility) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: false,
                message: "Infrastructure introuvable"
            }));
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            data: facility
        }));

    } catch (error) {
        console.error("ERREUR COMPLETE :", error);

        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: error.message
        }));
    }
};

const createFacility = async (req, res) => {
    try {
        const body = await parseBody(req);

        const facility = await infrastructureRepository.create(body);

        res.writeHead(201, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            data: facility
        }));

    } catch (error) {
        console.error("Erreur création infrastructure :", error);

        res.writeHead(400, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: error.message
        }));
    }
};

const updateFacility = async (req, res, params) => {
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

        const facility = await infrastructureRepository.update(id, body);

        if (!facility) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: false,
                message: "Infrastructure introuvable"
            }));
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            data: facility
        }));

    } catch (error) {
        console.error("Erreur modification infrastructure :", error);

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
    getFacilities,
    getFacilityById,
    createFacility,
    updateFacility
};