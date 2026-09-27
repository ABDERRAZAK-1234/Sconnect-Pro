const parseBody = require("../utils/bodyParser");
const infrastructureRepository = require("../repositories/infrastructureRepository");
const render = require("../core/renderer");

const getFacilities = async (req, res) => {
    try {
        const facilities = await infrastructureRepository.findAll();

        await render(res, "pages/facilities/index", {
            title: "Infrastructures",
            facilities
        });

    } catch (error) {
        console.error("Erreur récupération infrastructures :", error);

        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur lors de la récupération des infrastructures");
    }
};

const getFacilityById = async (req, res, params) => {
    try {
        const id = Number(params.id);

        if (!id || id <= 0) {
            res.writeHead(400, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("ID invalide");
        }

        const facility = await infrastructureRepository.findById(id);

        if (!facility) {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("Infrastructure introuvable");
        }

        await render(res, "pages/facilities/detail", {
            title: facility.nom,
            facility
        });

    } catch (error) {
        console.error("Erreur récupération infrastructure :", error);

        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur serveur");
    }
};

const createFacility = async (req, res) => {
    try {
        const body = await parseBody(req);

        const data = {
            nom: body.nom,
            type: body.type,
            capacite_erp: Number(body.capacite_erp),
            divisible: body.divisible === "true"
        };

        await infrastructureRepository.create(data);

        res.writeHead(303, {
            "Location": "/facilities"
        });

        res.end();

    } catch (error) {
        console.error("Erreur création infrastructure :", error);

        res.writeHead(400, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end(error.message);
    }
};

const showCreateFacility = async (req, res) => {
    await render(res, "pages/facilities/create", {
        title: "Créer une infrastructure"
    });
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

const deleteFacility = async (req, res, params) => {
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

        const facility = await infrastructureRepository.remove(id);

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
            message: "Infrastructure supprimée avec succès",
            data: facility
        }));

    } catch (error) {
        console.error("Erreur suppression infrastructure :", error);

        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: "Erreur serveur"
        }));
    }
};

const showEditFacility = async (req, res, params) => {
    try {
        const id = Number(params.id);

        if (!id || id <= 0) {
            res.writeHead(400, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("ID invalide");
        }

        const facility = await infrastructureRepository.findById(id);

        if (!facility) {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            return res.end("Infrastructure introuvable");
        }

        await render(res, "pages/facilities/edit", {
            title: `Modifier ${facility.nom}`,
            facility
        });

    } catch (error) {
        console.error("Erreur affichage modification :", error);

        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end("Erreur serveur");
    }
};

module.exports = {
    getFacilities,
    getFacilityById,
    createFacility,
    showCreateFacility,
    updateFacility,
    deleteFacility,
    showEditFacility
};