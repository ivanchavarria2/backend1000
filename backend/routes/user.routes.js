import { Router } from 'express';
import * as ctrl from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const r = Router();
r.use(protect);

r.get('/',     ctrl.getUserProfile);
r.put('/',     ctrl.updateUserProfile);

export default r;


