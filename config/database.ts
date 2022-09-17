import { Sequelize } from "sequelize";
require('dotenv').config();


const database = new Sequelize(`db_jogo_da_velha`, `root`, `${process.env.DB_PASSWORD}`, {
    dialect: 'mysql',
    host: `${process.env.DB_HOST}`
})

export default database