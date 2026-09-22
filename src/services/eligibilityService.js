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

module.exports = {
    getAgeAtEndOfYear,
    getAgeCategory
};