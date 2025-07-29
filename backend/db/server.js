import dotenv from 'dotenv';
dotenv.config();                // lee .env antes de todo

import express  from 'express';
import cors     from 'cors';
import helmet   from 'helmet';
import morgan   from 'morgan';
import rateLimit from 'express-rate-limit';

import { connectDB } from '../configu/database.js';
import { errorHandler } from '../middleware/errorHandler.js';

// Rutas
import authRoutes     from '../routes/auth.js';
import workoutRoutes  from '../routes/workout.js';
import exerciseRoutes from '../routes/exercises.js';
import routeRoutes    from '../routes/routes.js';
import progressRoutes from '../routes/progress.js';

const app = express();

// 📌 Middlewares globales
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// 📌 Endpoints
app.use('/api/auth',      authRoutes);
app.use('/api/workouts',  workoutRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/routes',    routeRoutes);
app.use('/api/progress',  progressRoutes);

// 📌 Manejador de errores al final
app.use(errorHandler);

// 📌 Inicio
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`⚡️  Servidor corriendo en http://localhost:${PORT}`);
});

