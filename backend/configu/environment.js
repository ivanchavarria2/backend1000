import * as dotenv from 'dotenv';
dotenv.config();

// ⚙️ Configuración de la base de datos
export const DB_CONNECTION = process.env.DB_CONNECTION || 'mysql';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_DATABASE = process.env.DB_DATABASE || 'app';
export const DB_USERNAME = process.env.DB_USERNAME || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';

// 🌐 Configuración del servidor
export const PORT = process.env.PORT || 3000;

// 🔐 Configuración de JWT
export const JWT_SECRET = process.env.JWT_SECRET || 'clave_jwt_secreta_segura_larga';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRE || '1h';

// 📧 Configuración de email (si usas)
export const EMAIL_USER = process.env.EMAIL_USER || 'tucorreo@gmail.com';
export const EMAIL_PASS = process.env.EMAIL_PASS || 'clavegenerada';
