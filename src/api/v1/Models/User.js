import db from "../../../config/Database.js"
import { Sequelize } from "sequelize"
import Divisions from "./Division.js"

const { DataTypes } = Sequelize

const Users = db.define('Users', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true
        }
    },
    fullname:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            arg: true,
            msg: 'Username already exists'
        },
        validate:{
            notEmpty: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    photo:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    cover:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    divisionId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    role:{
        type: DataTypes.ENUM("admin", "employee"),
        defaultValue: "employee"
    },
    statusActive:{
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: "active"
    }
}, {
    freezeTableName: true
})

//relasi one to many (1 user has many product)
Divisions.hasMany(Users, {foreignKey: 'divisionId'})
Users.belongsTo(Divisions, {foreignKey: 'divisionId'})

export default Users