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

    // NomeValido.findAll({
    //     attributes: [
    //         "nome",
    //         [sequelize.fn("COUNT", sequelize.col("nome")), "count_nome"]
    //     ],
    //     group: ["nome"]
    // }).then(r => {
    //     console.log(r);
    //     res.send(r)
    // }
    // )

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

})



