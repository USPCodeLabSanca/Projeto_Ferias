const express = require("express");
const { generateRandomName, checkName, saveName, getErrorStats } = require("./controllers/controllers");
const nameMiddleware = require("./middlewares/nameMiddleware");

const router = express.Router();

router.get("/nomes/aleatorios", generateRandomName);

router.post("/verificar", nameMiddleware, checkName);

router.post("/nomes/validos", nameMiddleware, saveName);

router.get("/estatisticas/erros", getErrorStats);

module.exports = router;
