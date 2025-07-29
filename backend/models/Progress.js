import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../configu/database.js';
import User from './User.js';
import Workout from './Workout.js';

class Progress extends Model {}
Progress.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    weightKg: DataTypes.DECIMAL(5,2),
    bodyFat: DataTypes.DECIMAL(4,1),
    notes: DataTypes.TEXT
  },
  { sequelize, tableName: 'progress', timestamps: true }
);

Progress.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Progress, { foreignKey: 'userId' });

Progress.belongsTo(Workout, { foreignKey: 'workoutId' });
Workout.hasMany(Progress, { foreignKey: 'workoutId' });

export default Progress;
