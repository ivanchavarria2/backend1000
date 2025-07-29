import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validationResult } from 'express-validator';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../configu/environment.js';


// Función para firmar tokens de forma consistente
const signToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password,role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed ,role});

    const token = signToken({ id: user.id, email });

    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = signToken({ id: user.id });

    const dataUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: dataUser,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};
export const logout = (req, res) => {
  // Frontend eliminará token. Si usas cookies, limpiarlas:
  res.clearCookie('token').json({ message: 'Sesión cerrada' });
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
      const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: 'Usuario no existe' });
    
    const resetToken = signToken({ id: user.id }, '15m');
    await sendResetEmail(email, resetToken);
    res.json({ message: 'Email enviado' });
  } catch (err) { next(err); }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const hashed = await bcrypt.hash(password, 10);
    await User.update({ password: hashed }, { where: { id } });
    res.json({ message: 'Contraseña actualizada' });
  } catch (err) { next(err); }
};

export const getProfile = (req, res) => {
  console.log("getProfile, usuario:", req.user);
  res.json(req.user);
};

export const updateProfile = async (req, res, next) => {
  try {
    await User.update(req.body, { where: { id: req.user.id } });
    const updated = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    res.json(updated);
  } catch (err) { next(err); }
};