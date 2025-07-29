import { Router } from 'express';
import * as ctrl from '../controllers/exerciseController.js';
import { protect } from '../middleware/authMiddleware.js';

const r = Router();
r.get('/', ctrl.catalog); // catálogo público

r.use(protect);
r.post('/', ctrl.create);
r.get('/category/:category', ctrl.byCategory);
r.get('/:id',    ctrl.getOne);
r.put('/:id',    ctrl.update);
r.delete('/:id', ctrl.remove);

export default r;
