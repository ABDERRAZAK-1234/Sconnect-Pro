const calculatePaymentSchedule = (prixFinal, nombreEcheances = 1) => {

    const montant = Number(prixFinal);

    if (isNaN(montant) || montant < 0) {
        throw new Error("Le prix final est invalide");
    }

    if (![1, 3].includes(nombreEcheances)) {
        throw new Error(
            "Le nombre d'échéances doit être 1 ou 3"
        );
    }

    if (nombreEcheances === 1) {
        return {
            nombreEcheances: 1,
            echeances: [
                {
                    numero: 1,
                    pourcentage: 100,
                    montant: Number(montant.toFixed(2))
                }
            ]
        };
    }

    const montantTotal = Math.round(montant * 100);

    const premiereEcheance =
        Math.round(montantTotal * 0.40);

    const deuxiemeEcheance =
        Math.round(montantTotal * 0.30);

    const troisiemeEcheance =
        montantTotal -
        premiereEcheance -
        deuxiemeEcheance;

    return {
        nombreEcheances: 3,
        echeances: [
            {
                numero: 1,
                pourcentage: 40,
                montant: premiereEcheance / 100
            },
            {
                numero: 2,
                pourcentage: 30,
                montant: deuxiemeEcheance / 100
            },
            {
                numero: 3,
                pourcentage: 30,
                montant: troisiemeEcheance / 100
            }
        ]
    };
};

module.exports = {
    calculatePaymentSchedule
};