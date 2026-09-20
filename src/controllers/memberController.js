const membreRepository = require("../repositories/membreRepository");
const parseBody = require("../utils/bodyParser");

const getMembres = async (req, res) => {
    try {
        const membres = await membreRepository.findAll();

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            data: membres
        }));

    } catch (error) {
        console.error("Erreur récupération membres :", error);

        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: "Erreur serveur"
        }));
    }
};

const getMembreById = async (req, res, params) => {
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

        const membre = await membreRepository.findById(id);

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
        console.error("Erreur récupération membre :", error);

        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: "Erreur serveur"
        }));
    }
};

const createMembre = async (req, res) => {
    try {
        const body = await parseBody(req);

        const membre = await membreRepository.create(body);

        res.writeHead(201, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: true,
            data: membre
        }));

    } catch (error) {
        console.error("Erreur création membre :", error);

        res.writeHead(400, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            success: false,
            message: error.message
        }));
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
    createMembre,
    updateMembre,
    deleteMembre
};