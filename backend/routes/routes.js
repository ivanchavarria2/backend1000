import { Router } from 'express';
import * as ctrl from '../controllers/routeController.js';
import { protect } from '../middleware/authMiddleware.js';

const r = Router();
r.use(protect);

r.post('/', ctrl.create);
r.get('/',  ctrl.list);
r.get('/popular', ctrl.popular);
r.post('/:id/record', ctrl.recordTime);
r.put('/:id', ctrl.update);
r.delete('/:id', ctrl.remove);

export default r;
