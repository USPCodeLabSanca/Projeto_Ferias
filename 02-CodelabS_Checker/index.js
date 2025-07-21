import express from "express"
import cors from "cors"

import sequelize from "./Database.js"

import NomeValido from "./models/NomeValido.js"
import NomeInvalido from "./models/NomeInvalido.js"

const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json())

app.listen(3000, () => {
    sequelize.authenticate().then(() => {
        console.log("conectou");
    })

    NomeValido.sync({ alter: true })
    NomeInvalido.sync({ alter: true })
})

app.post("/nomes/validos", async (req, res) => {

    const nome = req.body.nome

    NomeValido.findAll({
        where: {
            nome: nome
        }
    }).then(r => {
        if (r.length > 0) {
            res.status(409)
            res.send({
                msg: "Nome já existe."
            })
            return
        }

        NomeValido.create({ nome: nome }).then(r => {
            res.status(201)
            res.send(r)

        })

    })

})

app.post("/verificar", async (req, res) => {
    const nome = req.body.nome

    NomeValido.findAndCountAll({
        where: {
            nome: nome
        }
    }).then(r => {
        if (r.count > 0) {
            res.status(200)
            res.send({
                valido: true
            })
            return
        }

        res.status(200)
        res.send({
            valido: false
        })

        NomeInvalido.create({ nome: nome }).then(o => console.log("nome inválido registrado")
        )
    })
})

app.get("/estatisticas/erros", async (req, res) => {
    NomeInvalido.findAll({
        attributes: [
            "nome",
            [sequelize.fn("COUNT", sequelize.col("nome")), "count_nome"]
        ],
        group: ["nome"],
        order: [[sequelize.literal("count_nome"), "DESC"]]
    }).then(r => {
        console.log(r);
        res.send(r)
    }
    )
})

app.get("/nomes/aleatorio", (req, res) => {
    function nomeAleatorio(textoOriginal) {
        let resultado = textoOriginal;

        const acoes = [
            () => {
                let temp = '';
                for (let i = 0; i < resultado.length; i++) {
                    if (Math.random() < 0.3) {
                        temp += resultado[i] === resultado[i].toUpperCase() ? resultado[i].toLowerCase() : resultado[i].toUpperCase();
                    } else {
                        temp += resultado[i];
                    }
                }
                resultado = temp;
            },

            () => {
                const palavras = resultado.split(' ');
                if (palavras.length > 1) {
                    if (Math.random() < 0.5) {
                        const indiceRemover = Math.floor(Math.random() * palavras.length);
                        const palavraRemovida = palavras.splice(indiceRemover, 1);
                        resultado = palavras.join(' ');
                    }
                }
            },

            () => {
                if (resultado.includes("Code") && !resultado.includes("Codes")) {
                    resultado = resultado.replace("Code", "Codes");
                }
                if (resultado.includes("Lab") && !resultado.includes("Labs")) {
                    resultado = resultado.replace("Lab", "Labs");
                }
            },

            () => {
                const variantesCodelab = [
                    "CodeLab",
                    "Code labe",
                    "Cod lab",
                    "Codalab",
                    "Codeslab",
                    "Codeleb",
                    "CodelabS"
                ];
                const varianteAleatoria = variantesCodelab[Math.floor(Math.random() * variantesCodelab.length)];

                if (resultado.includes("Code Lab")) {
                    resultado = resultado.replace("Code Lab", varianteAleatoria);
                } else if (resultado.includes("CodeLab")) {
                    resultado = resultado.replace("CodeLab", varianteAleatoria);
                }
            },

            () => {
                const cidadesProximas = ["Araraquara", "Rio Claro", "Massachusetts", "Itirapina"];
                const cidadeAleatoria = cidadesProximas[Math.floor(Math.random() * cidadesProximas.length)];
                if (resultado.includes("São Carlos")) {
                    resultado = resultado.replace("São Carlos", cidadeAleatoria);
                }
            },

            () => {
                const universidades = ["UFSCar", "Unicamp", "Uninove", "Mackenzie", "Estácio", "FATEC"];
                const universidadeAleatoria = universidades[Math.floor(Math.random() * universidades.length)];
                if (resultado.includes("USP")) {
                    resultado = resultado.replace("USP", universidadeAleatoria);
                }
            },

            () => {
                const emojis = ["🙏", "🤐", "🥶", "💀", "🔥", "🤓", "🚀", "✨", "😂", "🤯"];
                const numEmojis = Math.floor(Math.random() * 4) + 1;
                let emojisAdicionados = "";
                for (let i = 0; i < numEmojis; i++) {
                    const emojiAleatorio = emojis[Math.floor(Math.random() * emojis.length)];
                    emojisAdicionados += emojiAleatorio;
                }
                resultado += emojisAdicionados;
            },
        ];

        const numAcoesAplicar = Math.floor(Math.random() * 3) + 3;
        let acoesJaAplicadas = new Set();

        for (let i = 0; i < numAcoesAplicar; i++) {
            let indiceAcao;
            do {
                indiceAcao = Math.floor(Math.random() * acoes.length);
            } while (acoesJaAplicadas.has(indiceAcao));

            acoes[indiceAcao]();
            acoesJaAplicadas.add(indiceAcao);
        }

        return resultado;
    }

    res.send(nomeAleatorio("USP Code Lab São Carlos"))
})



