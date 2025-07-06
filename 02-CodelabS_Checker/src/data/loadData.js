const data = require("../database/index.json");

function loadData() {
    if (!data) {
        throw new Error("Error while loading data");
    }

    return data;
}

module.exports = { loadData };
