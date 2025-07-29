import { Sequelize } from 'sequelize';
import * as env from './environment.js';

export const sequelize = new Sequelize(
  env.DB_DATABASE,
  env.DB_USERNAME,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_CONNECTION,
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos');
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  }
};

