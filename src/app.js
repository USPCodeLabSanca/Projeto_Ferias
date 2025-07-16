import express from "express";
import { lerDB, escreverDB } from "./database/dbMain.js";

// Inicializa um servidor express
const app = express();

// Middleware (Ajuda a aceitar o formato JSON)
app.use(express.json());

// Gera e retorna um nome de CodeLab incorreto.
app.get("/nomes/aleatorio", (req, res) => {
  res.status(200).send("CodeLabS");
});

// Recebe um nome e diz se ele é valido.
app.post("/verificar", async (req, res) => {
  if (!req.body) {
    return res.status(400)
              .send("Corpo da requisição ausente ou malformado.");
  }
  
  const nomeFornecido = req.body.nome;
  if(nomeFornecido){
    const dbValidos = await lerDB("validos.json");
    // Verifica se o nome fornecido está na lista de nomes validos.
    const ehValido = dbValidos.some(({ nome }) => nome === nomeFornecido);

    if (ehValido) {
      res.status(200).send("Nome passado é valido.");
    } else {
      const dbErros = await lerDB("erros.json");
      // Verifica se o nome já foi registrado.
      const erroExistente = dbErros.find(({ nomeInvalido }) => nomeInvalido === nomeFornecido);

      if (erroExistente) {
        erroExistente.vezes++;
        res.status(404).send("Nome não é válido, já registrado.");
      } else {
        // Registra novo nome inválido.
        dbErros.push({ nomeInvalido: nomeFornecido, vezes: 1 }); 
        res.status(201).send("Nome não é válido e foi registrado.");
      }
      await escreverDB("erros.json", dbErros);
    }
    await escreverDB("validos.json", dbValidos);
  } else {
    res.status(400).send("Nome não fornecido.");
  }
});

// Adiciona uma nova versão "correta" do nome do CodeLab.
app.post("/nomes/validos", async (req, res) => {
  if (!req.body) {
    return res.status(400)
              .send("Corpo da requisição ausente ou malformado.");
  }

  const nomeFornecido = req.body.nome;
  if(nomeFornecido){
    const dbValidos = await lerDB("validos.json");
    dbValidos.push({nome: nomeFornecido});
    res.status(201).send("Nova versão correta adicionada.");
    await escreverDB("validos.json", dbValidos);
  } else {
    res.status(400).send("Nome não fornecido.");
  }
});

// Retorna uma lista dos nomes errados que os usuários mais tentaram validar.
app.get("/estatisticas/erros", (req, res) => {
  res.status(200).json(erros);
});

// Rota raiz, verifica se servidor está online
app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: "API está online!",
    endpoints: {
      nomes: "/nomes/aleatorio",
      verificar: "/verificar",
      estatisticas: "/estatisticas/erros"
    }
  });
});

export default app;