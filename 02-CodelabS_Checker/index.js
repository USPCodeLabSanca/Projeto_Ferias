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

        NomeInvalido.create({nome: nome}).then(o => console.log("nome inválido registrado")
        )
    })
})

app.get("/estatisticas/erros", async (req,res) => {
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



