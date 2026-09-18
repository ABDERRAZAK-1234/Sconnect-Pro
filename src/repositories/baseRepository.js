const db = require("../config/db");

const allowedTables = [
    "famille",
    "membre",
    "association",
    "infrastructure",
    "activite",
    "inscription",
    "paiement"
];

const checkTable = (table) => {
    if (!allowedTables.includes(table)) {
        throw new Error(`Table non autorisée : ${table}`);
    }
};

const findAll = async (table) => {
    checkTable(table);

    const result = await db.query(
        `SELECT * FROM ${table}`
    );

    return result.rows;
};

const findById = async (table, id) => {
    checkTable(table);

    const result = await db.query(
        `SELECT * FROM ${table} WHERE id = $1`, [id]
    );

    return result.rows[0];
};

module.exports = {
    findAll,
    findById
};