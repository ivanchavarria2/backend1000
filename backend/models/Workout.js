import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configu/database.js'; 
import User from './User.js';

class Workout extends Model {}

Workout.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(80), allowNull: false },
    description: DataTypes.TEXT,
    scheduledAt: DataTypes.DATE,
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    latitude: DataTypes.DECIMAL(9,6),
    longitude: DataTypes.DECIMAL(9,6)
  },
  { sequelize, tableName: 'workouts', timestamps: true }
);

// Relaciones
Workout.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Workout, { foreignKey: 'userId' });

export default Workout;
