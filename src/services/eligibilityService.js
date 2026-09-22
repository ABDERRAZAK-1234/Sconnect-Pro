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

module.exports = {
    getAgeAtEndOfYear
};