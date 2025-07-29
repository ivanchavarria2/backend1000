import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();
import { connectDB, sequelize } from './configu/database.js'; // fuerza conexión
import {errorHandler} from './middleware/errorHandler.js';



const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Para servir imágenes
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));




app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();            // conectar a la DB
    await sequelize.sync();       // sincronizar tablas (crear si no existen)
    app.listen(process.env.PORT || 4000, () =>
      console.log(`⚡️ Server on ${process.env.PORT || 4000}`)
    );
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error);
  }
};

startServer();
