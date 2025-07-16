import express from "express";
import { lerDB, escreverDB } from "./database/dbMain.js";
import { 
  adicionarNome, 
  pegarNome, 
  buscarNome,
  atualizarNome, 
  deletarNome 
} from "./models/nomes.js";
import { 
  adicionarErro, 
  atualizarErro, 
  buscarErro, 
  pegarErro, 
  pegarTodosErros
} from "./models/erros.js";

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
  
  if(!nomeFornecido) res.status(400).send("Nome não fornecido.");


  // Verifica se o nome fornecido está na lista de nomes validos.
  const ehValido = await buscarNome(nomeFornecido); 

  // Se for válido, não faz nada
  if (ehValido) res.status(200).send("Nome passado é valido.");
  
  // Verifica se o nome já foi registrado.
  const erroExistente = await pegarErro(nomeFornecido);

  if (erroExistente) {
    erroExistente.vezes++;
    await atualizarErro(erroExistente.nome, erroExistente);
    res.status(404).send("Nome não é válido, já registrado.");
  } else {
    // Registra novo nome inválido.
    await adicionarErro(nomeFornecido);
    res.status(201).send("Nome não é válido e foi registrado.");
  }
  
});

// Adiciona uma nova versão "correta" do nome do CodeLab.
app.post("/nomes/validos", async (req, res) => {
  if (!req.body) {
    return res.status(400)
              .send("Corpo da requisição ausente ou malformado.");
  }

  const nomeFornecido = req.body.nome;
  if(!nomeFornecido) res.status(400).send("Nome não fornecido.");
  
  const jaExiste = await buscarNome(nomeFornecido);
  if(jaExiste) {
    res.status(409).send("Versão correta já existe.");
  } else {
    await adicionarNome(nomeFornecido);
    res.status(201).send("Nova versão correta adicionada.");
  }
});

// Retorna uma lista dos nomes errados que os usuários mais tentaram validar.
app.get("/estatisticas/erros", async (req, res) => {
  const dbErros = await pegarTodosErros();
  res.status(200).json(dbErros);
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