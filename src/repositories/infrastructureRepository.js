const baseRepository = require("./baseRepository");

const findAll = async () => {
    return await baseRepository.findAll("infrastructure");
};

const findById = async (id) => {
    return await baseRepository.findById("infrastructure", id);
};

module.exports = {
    findAll,
    findById
};