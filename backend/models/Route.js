import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../configu/database.js';
import User from './User.js';

class Route extends Model {}
Route.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(80), allowNull: false },
    distanceKm: { type: DataTypes.DECIMAL(6,2) },
    geoJson: { type: DataTypes.JSON }
  },
  { sequelize, tableName: 'routes', timestamps: true }
);

Route.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Route, { foreignKey: 'userId' });

export default Route;
