import { Sequelize, Op, Model, DataTypes } from "sequelize"

import 'dotenv/config'

const sequelize = new Sequelize(
    process.env.DB_DATABASE, //projeto_ferias
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT
    }
)

export default sequelize

