import { Sequelize } from "sequelize";
import database from "../config/database";

const { DataTypes }: any = Sequelize;

const Player = database.define(
  "tbl_players",
  {
    cd_player: {
      type: DataTypes.STRING(300),
      autoIncrement: false,
      primaryKey: true,
    },
    nickname_player: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password_player: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    total_victory: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export default Player;
