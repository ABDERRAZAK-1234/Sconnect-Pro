const membreRepository = require("../repositories/membreRepository");
const familleRepository = require("../repositories/familleRepository");
const inscriptionRepository = require("../repositories/inscriptionRepository");

const calculatePrice = async (membreId, prixBase, client) => {

    const membre = await membreRepository.findById(
        membreId,
        client
    );

    if (!membre) {
        throw new Error("Membre introuvable");
    }

    const famille = await familleRepository.findById(membre.famille_id, client);

    if (!famille) {
        throw new Error("Famille introuvable");
    }

    let prix = Number(prixBase);

    if (!Number.isFinite(prix) || prix < 0) {
        throw new Error("Le prix de base est invalide");
    }

    // Resident / extérieur
    if (!membre.est_resident) {
        prix = prix * 1.35;
    }

    // Réduction familiale
    const nombreInscriptions =
        await inscriptionRepository.countFamilyRegistrations(
            membre.famille_id,
            client 
        );

    if (nombreInscriptions === 1) {
        // 2éme membre
        prix = prix * 0.85;
    } else if (nombreInscriptions >= 2) {
        // 3 eme membre et suivants
        prix = prix * 0.70;
    }

    // Quotient familial
    const quotientFamilial = famille.quotient_familial;

    if (quotientFamilial !== null && quotientFamilial !== undefined) {

        const qf = Number(quotientFamilial);

        if (qf < 600) {
            // -40%
            prix = prix * 0.60;
        } else if (qf <= 900) {
            // -20%
            prix = prix * 0.80;
        }
    }

    // Pass'Sport
    if (
        membre.code_pass_sport &&
        membre.code_pass_sport.trim() !== ""
    ) {
        prix = prix - 50;
    }

    // Prix minimum
    prix = Math.max(prix, 15);

    // Arrondi à 2 décimales
    prix = Number(prix.toFixed(2));

    return {
        prixBase: Number(Number(prixBase).toFixed(2)),
        prixFinal: prix
    };
};

module.exports = {
    calculatePrice
};