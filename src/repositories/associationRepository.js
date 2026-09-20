const baseRepository = require("./baseRepository");

const findAll = () => {
    return baseRepository.findAll("association");
};

const findById = (id) => {
    return baseRepository.findById("association", id);
};

const create = (data) => {
    return baseRepository.create("association", data);
};

const update = (id, data) => {
    return baseRepository.update("association", id, data);
};

const remove = (id) => {
    return baseRepository.remove("association", id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};