const db = require("../config/db");

const membreRepository = require("../repositories/membreRepository");
const activiteRepository = require("../repositories/activiteRepository");
const inscriptionRepository = require("../repositories/inscriptionRepository");

const eligibilityService = require("./eligibilityService");
const pricingService = require("./pricingService");

const registerMember = async (membreId, activiteId) => {

    const client = await db.connect();

    try {

        await client.query("BEGIN");

        const activite =
            await activiteRepository.findByIdForUpdate(
                activiteId,
                client
            );

        if (!activite) {
            throw new Error("Activité introuvable");
        }

        const membre = await membreRepository.findById(membreId, client);

        if (!membre) {
            throw new Error("Membre introuvable");
        }

        const eligibility =
            await eligibilityService.checkEligibility(
                membreId,
                activite.categorie_age,
                activite.nom
            );

        if (!eligibility.eligible) {
            throw new Error(eligibility.reason);
        }

        const nombreConfirmes =
            await inscriptionRepository.countConfirmed(
                activiteId,
                client
            );

        if (nombreConfirmes >= activite.capacite_max) {

            const scorePriorite =
                membre.est_resident ? 10 : 0;

            const inscription =
                await inscriptionRepository.createWithClient(
                    {
                        membre_id: membreId,
                        activite_id: activiteId,
                        statut: "en_attente",
                        score_priorite: scorePriorite,
                        date_entree_liste_attente: new Date()
                    },
                    client
                );

            await client.query("COMMIT");

            return {
                status: "en_attente",
                message: "Activité complète, membre ajouté à la liste d'attente",
                inscription
            };
        }

        const pricing =
            await pricingService.calculatePrice(
                membreId,
                activite.prix_base,
                client
            );

        const inscription =
            await inscriptionRepository.createWithClient(
                {
                    membre_id: membreId,
                    activite_id: activiteId,
                    statut: "confirmee",
                    prix_final: pricing.prixFinal
                },
                client
            );

        await client.query("COMMIT");

        return {
            status: "confirmee",
            message: "Inscription confirmée",
            inscription,
            pricing
        };

    } catch (error) {

        await client.query("ROLLBACK");

        throw error;

    } finally {

        client.release();
    }
};

module.exports = {
    registerMember
};