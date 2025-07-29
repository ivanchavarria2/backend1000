import { Router } from 'express';
import * as ctrl from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const r = Router();
r.use(protect);

r.get('/',           ctrl.list);
r.post('/',          ctrl.create);
r.get('/nearby',     ctrl.nearby);
r.get('/scheduled',  ctrl.scheduled);
r.put('/:id/complete', ctrl.complete);

r.get('/:id',    ctrl.getOne);
r.put('/:id',    ctrl.update);
r.delete('/:id', ctrl.remove);

export default r;
