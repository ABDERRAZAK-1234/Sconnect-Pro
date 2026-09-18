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

const findWhere = async (table, conditions) => {
    checkTable(table);

    const colums = Object.keys(conditions);
    const values = Object.values(conditions);

    const whereClause = colums
        .map((colum, index) => `${colum} = $${index + 1}`)
        .join(" AND ");

    const result = await db.query(
        `SELECT * FROM ${table} WHERE ${whereClause}`, values
    );

    return result.rows;
};

const create = async (table, data) => {
    checkTable(table);

    const columns = Object.keys(data);
    const values = Object.values(data);

    const placeholders = columns
        .map((_, index) => `$${index + 1}`)
        .join(", ");

    const result = await db.query(
        `INSERT INTO ${table} (${columns.join(", ")})
        VALUES (${placeholders})
         RETURNING *`,
        values
    );

    return result.rows[0];
};

const update = async (table, id, data) => {
    checkTable(table);

    const columns = Object.keys(data);
    const values = Object.values(data);

    const setClause = columns
        .map((column, index) => `${column} = $${index + 1}`)
        .join(", ");

    values.push(id);

    const result = await db.query(
        `UPDATE ${table}
         SET ${setClause}
         WHERE id = $${values.length}
         RETURNING *`,
        values
    );

    return result.rows[0];
};

const remove = async (table, id) => {
    checkTable(table);

    const result = await db.query(
        `DELETE FROM ${table}
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    findAll,
    findById,
    findWhere,
    create,
    update,
    remove
};