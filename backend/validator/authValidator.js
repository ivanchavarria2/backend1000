import { body } from 'express-validator';

export const registerValidator = [
  body('name', 'El nombre es obligatorio').notEmpty(),
  body('email', 'El email no es válido').isEmail(),
  body('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
  body('role')
    .optional() // el campo es opcional, pero si se envía, debe cumplir con lo siguiente
    .isIn(['athlete', 'coach', 'admin'])
    .withMessage('El rol debe ser athlete, coach o admin'),
];
