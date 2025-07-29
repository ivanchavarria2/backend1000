import { Router } from 'express';
import * as ctrl from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';

const r = Router();
r.use(protect);

r.post('/', ctrl.create);
r.get('/',  ctrl.list);
r.get('/stats',  ctrl.stats);
r.get('/charts', ctrl.charts);
r.put('/:id',    ctrl.update);

export default r;
