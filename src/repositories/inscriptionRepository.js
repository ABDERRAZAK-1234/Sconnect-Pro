const baseRepository = require("./baseRepository");

const findAll = () => {
    return baseRepository.findAll("inscription");
};

const findById = (id) => {
    return baseRepository.findById("inscription", id);
};

const create = (data) => {
    return baseRepository.create("inscription", data);
};

const update = (id, data) => {
    return baseRepository.update("inscription", id, data);
};

const remove = (id) => {
    return baseRepository.remove("inscription", id);
};

const countFamilyRegistrations = async (familleId) => {
    const db = require("../config/db");

    const result = await db.query(
        `SELECT COUNT(*) AS total
         FROM inscription i
         JOIN membre m ON m.id = i.membre_id
         WHERE m.famille_id = $1
         AND i.statut IN (
             'confirmee',
             'en_attente',
             'promoted_pending'
         )`,
        [familleId]
    );

    return Number(result.rows[0].total);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    countFamilyRegistrations
};