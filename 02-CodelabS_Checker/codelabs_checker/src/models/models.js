const fs = require("fs");

const RIGHT_NAMES_DB = "./src/db/rightNames.json";
const WRONG_NAMES_DB = "./src/db/wrongNames.json";

const getData = (db) => {
    const DB_NAME = db === "right" ? RIGHT_NAMES_DB : db === "wrong" ? WRONG_NAMES_DB : null;

    if (!DB_NAME) return null;

    const data = fs.readFileSync(DB_NAME, "utf8");
    return JSON.parse(data);
}

const saveData = (db, data) => {
    const DB_NAME = db === "right" ? RIGHT_NAMES_DB : db === "wrong" ? WRONG_NAMES_DB : null;

    if (!DB_NAME) return null;

    fs.writeFileSync(DB_NAME, JSON.stringify(data, null, 2));

    return true;
}

module.exports = {
    getData,
    saveData,
}