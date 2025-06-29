import { Sequelize } from "sequelize"

import 'dotenv/config'

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT
    }
)

sequelize.authenticate().then(() => {
    console.log("conectou");
    
})