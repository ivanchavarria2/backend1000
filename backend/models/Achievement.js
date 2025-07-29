import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';

class Achievement extends Model {}
Achievement.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    dateAchieved: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  { sequelize, tableName: 'achievements', timestamps: true }
);

Achievement.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Achievement, { foreignKey: 'userId' });

export default Achievement;
