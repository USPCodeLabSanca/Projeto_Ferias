import sequelize from "../Database.js";
import { DataTypes } from "sequelize";

const NomeInvalido = sequelize.define(
    "NomeInvalido",
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        tableName: "nomes_invalidos"
    }
)

export default NomeInvalido