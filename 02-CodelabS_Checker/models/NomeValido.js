import { DataTypes } from 'sequelize'
import sequelize from '../Database.js'

const NomeValido = sequelize.define(
    "NomeValido",
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        tableName: "nomes_validos"
    }
)

export default NomeValido