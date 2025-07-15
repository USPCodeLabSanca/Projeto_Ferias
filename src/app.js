import express from "express";

// Inicializa um servidor express
const app = express();

// Middleware (Ajuda a aceitar o formato JSON)
app.use(express.json());

const validos = [
  {
    nome: "CodeLab"
  }
];

const erros = [];

function verificarNome(nome) {
  return validos.some(nomeValido => {
    // Encerra iteração se nome for valido.
    return nomeValido.nome === nome;
  });
}

// Gera e retorna um nome de CodeLab incorreto.
app.get("/nomes/aleatorio", (req, res) => {
  res.status(200).send("CodeLabS");
});

// Recebe um nome e diz se ele é valido.
app.post("/verificar", (req, res) => {
  if (!req.body) {
    return res.status(400)
              .send("Corpo da requisição ausente ou malformado.");
  }
  
  const nomeFornecido = req.body.nome;
  if(nomeFornecido){
    const ehValido = verificarNome(nomeFornecido);

    if (ehValido) {
      res.status(200).send("Nome passado é valido.");
    } else {
      // Verifica se o nome já foi registrado
      const erroExistente = erros.find(erro => erro.nomeInvalido === nomeFornecido);

      if (erroExistente) {
        erroExistente.vezes++;
        res.status(404).send("Nome não é válido, já registrado.");
      } else {
        // Adiciona novo registro
        erros.push({ nomeInvalido: nomeFornecido, vezes: 1 }); 
        res.status(201).send("Nome não é válido e foi registrado.");
      }
    }
  } else {
    res.status(400).send("Nome não fornecido.");
  }
});

// Adiciona uma nova versão "correta" do nome do CodeLab.
app.post("/nomes/validos", (req, res) => {
  if (!req.body) {
    return res.status(400)
              .send("Corpo da requisição ausente ou malformado.");
  }
  
  const nomeFornecido = req.body.nome;
  if(nomeFornecido){
    validos.push({nome: nomeFornecido});
    res.status(201).send("Nova versão correta adicionada.");
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
    message: "API está online!",
    endpoints: {
      nomes: "/nomes/aleatorio",
      verificar: "/verificar",
      estatisticas: "/estatisticas/erros"
    }
  });
});

export default app;