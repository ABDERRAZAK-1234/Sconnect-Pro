const inscriptionRepository = require("../repositories/inscriptionRepository");
const activiteRepository = require("../repositories/activiteRepository");
const membreRepository = require("../repositories/membreRepository");

const calculatePriorityScore = (estResident) => {
    return estResident ? 10 : 0;
};

const addToWaitingList = async (membreId, activiteId) => {

    const membre = await membreRepository.findById(membreId);

    if (!membre) {
        throw new Error("Membre introuvable");
    }

    const activite = await activiteRepository.findById(activiteId);

    if (!activite) {
        throw new Error("Activité introuvable");
    }

    const nombreConfirmes =
        await inscriptionRepository.countConfirmed(activiteId);

    if (nombreConfirmes < activite.capacite_max) {
        throw new Error(
            "L'activité n'est pas encore complète"
        );
    }

    const scorePriorite =
        calculatePriorityScore(membre.est_resident);

    const inscription =
        await inscriptionRepository.create({
            membre_id: membreId,
            activite_id: activiteId,
            statut: "en_attente",
            score_priorite: scorePriorite,
            date_entree_liste_attente: new Date()
        });

    return inscription;
};

const getWaitingList = async (activiteId) => {

    const activite =
        await activiteRepository.findById(activiteId);

    if (!activite) {
        throw new Error("Activité introuvable");
    }

    return inscriptionRepository.findWaitingList(activiteId);
};

const getNextWaiting = async (activiteId) => {

    const activite =
        await activiteRepository.findById(activiteId);

    if (!activite) {
        throw new Error("Activité introuvable");
    }

    return inscriptionRepository.findNextWaiting(activiteId);
};

module.exports = {
    calculatePriorityScore,
    addToWaitingList,
    getWaitingList,
    getNextWaiting
};