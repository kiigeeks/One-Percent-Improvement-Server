import db from "../../../config/Database.js"
import { Sequelize } from "sequelize"

const { DataTypes } = Sequelize

const Divisions = db.define('Divisions', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            arg: true,
            msg: "Division already exists"
        },
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    statusActive:{
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: "active"
    }
}, {
    freezeTableName: true
})

export default Divisions