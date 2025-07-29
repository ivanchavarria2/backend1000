import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../configu/database.js';
import User from './User.js';

class Exercise extends Model {}
Exercise.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(60), allowNull: false },
    category: { type: DataTypes.STRING(40) },
    muscles: DataTypes.STRING,
    description: DataTypes.TEXT
  },
  { sequelize, tableName: 'exercises', timestamps: true }
);

// Ejercicios creados por el usuario o globales (userId = null)
Exercise.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Exercise, { foreignKey: 'userId' });

export default Exercise;
