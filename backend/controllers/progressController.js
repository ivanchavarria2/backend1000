import Progress from '../models/Progress.js';

export const create = (req, res, next) =>
  Progress.create({ ...req.body, userId: req.user.id })
          .then(p => res.status(201).json(p)).catch(next);

export const list = (req, res, next) =>
  Progress.findAll({ where: { userId: req.user.id } })
    .then(data => res.json(data))
    .catch(next);
export const stats = async (req, res, next) => {
  try {
    const all = await Progress.findAll({ where: { userId: req.user.id } });
    const weightSeries = all.map(p => ({ date: p.createdAt, kg: p.weightKg }));
    res.json({ weightSeries });
  } catch (err) { next(err); }
};

export const charts = stats; // mismo cálculo, distinto endpoint

export const update = (req, res, next) =>
  Progress.update(req.body, { where: { id: req.params.id, userId: req.user.id }, returning: true, plain: true })
          .then(([_, p]) => res.json(p)).catch(next);
