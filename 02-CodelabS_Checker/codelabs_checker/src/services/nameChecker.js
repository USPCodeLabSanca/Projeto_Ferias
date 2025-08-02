const { getData, saveData } = require("../models/models");

const rightNameChecker = (name) => {
  const rightNames = getData("right");

  if (!rightNames)
    return {
      isValid: false,
      message: "Não há nomes válidos para verificar",
    };

  const isRight = rightNames.rightNames.includes(name);

  if (isRight) {
    return {
      isValid: true,
      message: "Nome válido",
    };
  } else {
    return {
      isValid: false,
      message: "Nome inválido",
    };
  }
};

const nameChecker = (name) => {
  const check = rightNameChecker(name);
  if (check.isValid) return check;
  const wrongNames = getData("wrong");
  if (name in wrongNames) {
    wrongNames[name]++;
  } else {
    wrongNames[name] = 1;
  }

  saveData("wrong", wrongNames);
  return check;
};

module.exports = {
  nameChecker,
  rightNameChecker,
};
