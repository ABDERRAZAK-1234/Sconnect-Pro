const baseRepository = require("./baseRepository");

const findAll = () => {
    return baseRepository.findAll("famille");
};

const findById = (id) => {
    return baseRepository.findById("famille", id);
};

const create = (data) => {
    return baseRepository.create("famille", data);
};

const update = (id, data) => {
    return baseRepository.update("famille", id, data);
};

const remove = (id) => {
    return baseRepository.remove("famille", id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};