const { getData } = require("../models/models");

const errorStats = () => {
    const wrongNames = getData("wrong");

    if (!wrongNames) return {
        errors: [],
        totalErrors: 0,
    };

    const wrongNamesArray = Object.entries(wrongNames);
    wrongNamesArray.sort((a, b) => b[1] - a[1]);

    const errors = Object.fromEntries(wrongNamesArray);

    return {
        errors,
        totalErrors: wrongNamesArray.length,
    };
}

module.exports = errorStats;