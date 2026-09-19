const baseRepository = require("./baseRepository");

const findAll = async () => {
    return await baseRepository.findAll("infrastructure");
};

const findById = async (id) => {
    return await baseRepository.findById("infrastructure", id);
};

const create = (data) => {
    return baseRepository.create("infrastructure", data);
};

const update = (id, data) => {
    return baseRepository.update("infrastructure", id, data);
};

const remove = (id) => {
    return baseRepository.remove("infrastructure", id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};