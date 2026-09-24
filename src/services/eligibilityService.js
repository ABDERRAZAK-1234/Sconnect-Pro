const membreRepository = require("../repositories/membreRepository");

const getAgeAtEndOfYear = (dateNaissance) => {
    const birthDate = new Date(dateNaissance);

    const endOfYear = new Date(
        new Date().getFullYear(),
        11,
        31
    );

    let age = endOfYear.getFullYear() - birthDate.getFullYear();

    const month = endOfYear.getMonth() - birthDate.getMonth();

    if (
        month < 0 ||
        (month === 0 && endOfYear.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
};

const getAgeCategory = (age) => {

    if (age <= 6) {
        return "Eveil/Baby-Sport";
    }

    if (age >= 7 && age <= 8) {
        return "Poussin U9";
    }

    if (age >= 9 && age <= 10) {
        return "Benjamin U11";
    }

    if (age >= 11 && age <= 12) {
        return "Minime U13";
    }

    if (age >= 13 && age <= 14) {
        return "Cadet U15";
    }

    if (age >= 15 && age <= 17) {
        return "Junior U18";
    }

    if (age >= 18 && age <= 39) {
        return "Senior";
    }

    return "Veteran/Master";
};

const isRiskSport = (sport) => {

    const riskSports = [
        "Boxe",
        "Plongée sous-marine",
        "Rugby"
    ];

    return riskSports.includes(sport);
};

const checkMedicalCertificate = (membre, sport) => {

    if (
        !membre.date_emission_certificat ||
        !membre.date_expiration_certificat
    ) {
        return {
            valid: false,
            status: "medical_non_compliant",
            message: "Certificat médical absent"
        };
    }

    const today = new Date();
    const emission = new Date(
        membre.date_emission_certificat
    );
    const expiration = new Date(
        membre.date_expiration_certificat
    );

    if (expiration <= today) {

        if (isRiskSport(sport)) {
            return {
                valid: false,
                status: "medical_non_compliant",
                message: "Certificat médical expiré pour un sport à risque"
            };
        }

        return {
            valid: true,
            status: "medical_non_compliant",
            message: "Certificat médical expiré"
        };
    }

    const differenceMs = expiration - emission;

    const differenceDays =
        differenceMs / (1000 * 60 * 60 * 24);

    const differenceYears =
        differenceDays / 365.25;

    if (
        isRiskSport(sport) &&
        differenceYears > 1
    ) {
        return {
            valid: false,
            status: "medical_non_compliant",
            message: "Certificat trop ancien pour un sport à risque"
        };
    }

    if (differenceYears > 3) {
        return {
            valid: true,
            status: "medical_non_compliant",
            message: "Certificat médical de plus de 3 ans"
        };
    }

    return {
        valid: true,
        status: "valide",
        message: "Certificat médical valide"
    };
};

const checkEligibility = async (membreId, categorieAge, sport) => {

    const membre = await membreRepository.findById(membreId);

    if (!membre) {
        throw new Error("Membre introuvable");
    }

    const age = getAgeAtEndOfYear(
        membre.date_naissance
    );

    const categorieMembre = getAgeCategory(age);

    if (
        categorieAge !== "Tous publics" &&
        categorieMembre !== categorieAge
    ) {
        return {
            eligible: false,
            reason: `Catégorie d'âge incompatible : ${categorieMembre}`
        };
    }

    const medical = checkMedicalCertificate(
        membre,
        sport
    );

    if (
        isRiskSport(sport) &&
        medical.status === "medical_non_compliant"
    ) {
        return {
            eligible: false,
            reason: medical.message
        };
    }

    return {
        eligible: true,
        age,
        categorie: categorieMembre,
        certificat: medical.status
    };
};

module.exports = {
    getAgeAtEndOfYear,
    getAgeCategory,
    isRiskSport,
    checkMedicalCertificate,
    checkEligibility
};