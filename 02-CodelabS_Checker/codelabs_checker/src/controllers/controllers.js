const nameGenerator = require("../services/nameGenerator");
const { nameChecker } = require("../services/nameChecker");
const nameSaver = require("../services/nameSaver");
const errorStats = require("../services/errorStats");

const generateRandomName = (req, res) => {
    const name = nameGenerator();
    res.json(name);
}

const checkName = (req, res) => {
    const { name } = req.body;
    const result = nameChecker(name);
    res.json(result);
}

const saveName = (req, res) => {
    const { name } = req.body;
    const result = nameSaver(name);
    res.json(result);
}

const getErrorStats = (req, res) => {
    const result = errorStats();
    res.json(result);
}

module.exports = {
    generateRandomName,
    checkName,
    saveName,
    getErrorStats,
};