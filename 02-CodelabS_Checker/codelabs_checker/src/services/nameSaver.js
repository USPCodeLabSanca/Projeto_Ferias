const { getData, saveData } = require("../models/models");

const nameSaver = (name) => {
    const rightNames = getData("right");

    if (!rightNames) {
        saveData("right", { rightNames: [name] });
        return {
            saved: true,
            message: "Nome salvo com sucesso",
        };
    }

    if (rightNames.rightNames.includes(name)) {
        return {
            saved: false,
            message: "Nome já existe",
        };
    }

    rightNames.rightNames.push(name);
    saveData("right", rightNames);

    return {
        saved: true,
        message: "Nome salvo com sucesso",
    };
}

module.exports = nameSaver;