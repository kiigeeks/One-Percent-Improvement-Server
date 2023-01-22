import { Sequelize } from "sequelize"

const db = new Sequelize('db_opi', 'root', 'mj26', {
    host: "localhost",
    dialect: "mysql",
    port: "8889"
})

export default db;