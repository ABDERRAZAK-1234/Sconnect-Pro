const baseRepository = require("./baseRepository");

const findAll = () => {
    return baseRepository.findAll("paiement");
};

const findById = (id) => {
    return baseRepository.findById("paiement", id);
};

const create = (data) => {
    return baseRepository.create("paiement", data);
};

const update = (id, data) => {
    return baseRepository.update("paiement", id, data);
};

const remove = (id) => {
    return baseRepository.remove("paiement", id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};