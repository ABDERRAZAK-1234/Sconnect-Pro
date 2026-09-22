const activiteRepository = require("../repositories/activiteRepository");
const infrastructureRepository = require("../repositories/infrastructureRepository");

const checkSchedule = async ({
    infrastructureId,
    jourSemaine,
    heureDebut,
    heureFin,
    capaciteMax,
    excludeActivityId = null
}) => {


    const infrastructure =
        await infrastructureRepository.findById(infrastructureId);

    if (!infrastructure) {
        throw new Error("Infrastructure introuvable");
    }

    if (Number(capaciteMax) > Number(infrastructure.capacite_erp)) {
        throw new Error(
            `La capacité maximale (${capaciteMax}) dépasse la capacité ERP (${infrastructure.capacite_erp})`
        );
    }

    if (heureDebut >= heureFin) {
        throw new Error(
            "L'heure de début doit être avant l'heure de fin"
        );
    }

    const conflit =
        await activiteRepository.findConflictingActivity(
            infrastructureId,
            jourSemaine,
            heureDebut,
            heureFin,
            excludeActivityId
        );

    if (conflit) {
        throw new Error(
            `Conflit avec l'activité "${conflit.nom}" (${conflit.heure_debut} - ${conflit.heure_fin})`
        );
    }

    return {
        valid: true,
        message: "Planning valide"
    };
};

module.exports = {
    checkSchedule
};