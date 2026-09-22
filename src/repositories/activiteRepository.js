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

const findConflictingActivity = async (
    infrastructureId,
    jourSemaine,
    heureDebut,
    heureFin,
    excludeId = null
) => {

    const activites = await baseRepository.findWhere(
        "activite",
        {
            infrastructure_id: infrastructureId,
            jour_semaine: jourSemaine
        }
    );

    return activites.find((activite) => {

        
        if (
            excludeId !== null &&
            Number(activite.id) === Number(excludeId)
        ) {
            return false;
        }

        return (
            heureDebut < activite.heure_fin &&
            heureFin > activite.heure_debut
        );
    });
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    findConflictingActivity
};