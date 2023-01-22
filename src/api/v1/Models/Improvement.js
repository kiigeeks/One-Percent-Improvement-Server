import db from "../../../config/Database.js"
import { Sequelize } from "sequelize"
import Users from "./User.js"

const { DataTypes } = Sequelize

const Improvements = db.define('Improvements', {
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
    note:{
        type: DataTypes.STRING,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    status:{
        type: DataTypes.ENUM('pending', 'done', 'progress'),
        allowNull: false,
        defaultValue: "progress"
    }
}, {
    freezeTableName: true
})

//relasi one to many (1 user has many product)
Users.hasMany(Improvements, { foreignKey: 'userId' })
Improvements.belongsTo(Users, { foreignKey: 'userId' })

export default Improvements