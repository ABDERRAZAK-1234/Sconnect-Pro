const baseRepository = require("./baseRepository");

const findAll = () => {
    return baseRepository.findAll("membre");
};

const findById = (id, client) => {
    return baseRepository.findById("membre", id, client);
};

const create = (data) => {
    return baseRepository.create("membre", data);
};

const update = (id, data) => {
    return baseRepository.update("membre", id, data);
};

const remove = (id) => {
    return baseRepository.remove("membre", id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};