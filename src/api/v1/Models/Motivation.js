import db from "../../../config/Database.js"
import { Sequelize } from "sequelize"

const { DataTypes } = Sequelize

const Motivations = db.define('Motivations', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true
        }
    },
    message:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    status:{
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: "active"
    }
}, {
    freezeTableName: true
})

export default Motivations