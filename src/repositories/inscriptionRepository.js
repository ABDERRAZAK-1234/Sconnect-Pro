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

const countFamilyRegistrations = async (familleId, client) => {

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

const countConfirmed = async (activiteId, client) => {

    const result = await client.query(
        `SELECT COUNT(*) AS total
         FROM inscription
         WHERE activite_id = $1
         AND statut = 'confirmee'`,
        [activiteId]
    );

    return Number(result.rows[0].total);
};

const findWaitingList = async (activiteId) => {
    const db = require("../config/db");

    const result = await db.query(
        `SELECT i.*, m.est_resident
         FROM inscription i
         JOIN membre m ON m.id = i.membre_id
         WHERE i.activite_id = $1
         AND i.statut = 'en_attente'
         ORDER BY i.score_priorite DESC,
                  i.date_entree_liste_attente ASC`,
        [activiteId]
    );

    return result.rows;
};

const findNextWaiting = async (activiteId) => {
    const db = require("../config/db");

    const result = await db.query(
        `SELECT i.*, m.est_resident
         FROM inscription i
         JOIN membre m ON m.id = i.membre_id
         WHERE i.activite_id = $1
         AND i.statut = 'en_attente'
         ORDER BY i.score_priorite DESC,
                  i.date_entree_liste_attente ASC
         LIMIT 1`,
        [activiteId]
    );

    return result.rows[0];
};

const createWithClient = async (data, client) => {

    const columns = Object.keys(data);
    const values = Object.values(data);

    const placeholders = columns
        .map((_, index) => `$${index + 1}`)
        .join(", ");

    const result = await client.query(
        `INSERT INTO inscription (${columns.join(", ")})
         VALUES (${placeholders})
         RETURNING *`,
        values
    );

    return result.rows[0];
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    countFamilyRegistrations,
    countConfirmed,
    findWaitingList,
    findNextWaiting,
    createWithClient
};