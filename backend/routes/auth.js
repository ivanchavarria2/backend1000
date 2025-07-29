import { Router } from 'express';
import * as ctrl from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';
import { registerValidator } from '../validator/authValidator.js';
const router = Router();

router.post('/register', 
    [
    body('name').notEmpty().withMessage('Nombre requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Mínimo 6 caracteres'),
    ],
   registerValidator, ctrl.register);
router.post('/login',    ctrl.login);
router.post('/logout',   ctrl.logout);
router.post('/forgot',   ctrl.forgotPassword);
router.post('/reset',    ctrl.resetPassword);

router.get('/profile',  protect, ctrl.getProfile);
router.put('/profile',  protect, ctrl.updateProfile);

export default router;
