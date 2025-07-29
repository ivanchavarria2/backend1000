import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();
import { connectDB, sequelize } from './configu/database.js'; // fuerza conexión
import {errorHandler} from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import workoutRoutes from './routes/workout.js';
import exerciseRoutes from './routes/exercises.js';
import routeRoutes from './routes/routes.js';
import progressRoutes from './routes/progress.js';
import userRoutes from './routes/user.routes.js';


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Para servir imágenes
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));

app.use('/api/auth', authRoutes);
app.use('/api/workout', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/user', userRoutes);


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
