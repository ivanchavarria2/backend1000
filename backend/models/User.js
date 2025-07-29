import { DataTypes,Model } from "sequelize";
import { sequelize } from "../configu/database.js";


class User extends Model {}
User.init(
  
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(60), allowNull: false },
    email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('athlete', 'coach', 'admin'), defaultValue: 'athlete' }
  },
  { sequelize, tableName: 'users', timestamps: true }
);

export default User;