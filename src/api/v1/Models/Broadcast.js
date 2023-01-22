import db from "../../../config/Database.js"
import { Sequelize } from "sequelize"

const { DataTypes } = Sequelize

const Broadcasts = db.define('Broadcasts', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true
        }
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    flyer:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    status:{
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: "inactive"
    }
}, {
    freezeTableName: true
})

export default Broadcasts