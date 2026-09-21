const baseRepository = require("./baseRepository");

const findAll = () => {
    return baseRepository.findAll("activite");
};

const findById = (id) => {
    return baseRepository.findById("activite", id);
};

const create = (data) => {
    return baseRepository.create("activite", data);
};

const update = (id, data) => {
    return baseRepository.update("activite", id, data);
};

const remove = (id) => {
    return baseRepository.remove("activite", id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};