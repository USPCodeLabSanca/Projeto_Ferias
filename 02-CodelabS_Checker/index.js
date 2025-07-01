import express from "express"
import cors from "cors"

import sequelize from "./Database.js"

import NomeValido from "./models/NomeValido.js"
import NomeInvalido from "./models/NomeInvalido.js"

const app = express()

app.use(cors({ origin: "*" }))

app.listen(3000, () => {
    sequelize.authenticate().then(() => {
        console.log("conectou");
    })

    NomeValido.sync({ alter: true })
    NomeInvalido.sync({ alter: true })
})

app.post("/nomes/validos", async (req, res) => {

    NomeValido.findAll({
        attributes: [
            "nome",
            [sequelize.fn("COUNT", sequelize.col("nome")), "count_nome"]
        ],
        group: ["nome"]
    }).then(r => {
        console.log(r);
        res.send(r)
    }
    )

})



