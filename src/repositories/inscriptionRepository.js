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

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};