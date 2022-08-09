import { Sequelize } from "sequelize";
import database from "../config/database";

const { DataTypes }: any = Sequelize;

const Player =  database.define('tbl_player', {
    
    cd_player: {
        type: DataTypes.STRING(300),
        autoIncrement: false,
        primaryKey: true
    },
    nickname_player: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email_player: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    password_player: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    total_victory: {
        type: DataTypes.INTEGER,
    },
})