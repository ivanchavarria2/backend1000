import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../configu/environment.js';

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'No autorizado, token faltante' });

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user)
      return res.status(401).json({ message: 'Usuario no encontrado' });

    req.user = user;
    next();
  } catch (err) {
    console.error('Error token:', err.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
