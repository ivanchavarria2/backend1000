import Workout from '../models/Workout.js';
import { Op } from 'sequelize';

export const list = (req, res, next) =>
  Workout.findAll({ where: { userId: req.user.id } })
        .then(w => res.json(w)).catch(next);

export const create = (req, res, next) =>
  Workout.create({ ...req.body, userId: req.user.id })
        .then(w => res.status(201).json(w)).catch(next);

export const getOne = (req, res, next) =>
  Workout.findOne({ where: { id: req.params.id, userId: req.user.id } })
        .then(w => w ? res.json(w) : res.sendStatus(404)).catch(next);

export const update = (req, res, next) =>
  Workout.update(req.body, { where: { id: req.params.id, userId: req.user.id }, returning: true, plain: true })
        .then(([_, w]) => res.json(w)).catch(next);

export const remove = (req, res, next) =>
  Workout.destroy({ where: { id: req.params.id, userId: req.user.id } })
        .then(() => res.sendStatus(204)).catch(next);

export const nearby = (req, res, next) => {
  const { lat, lng, radius = 10 } = req.query; // km
  Workout.findAll({
    where: {
      latitude: { [Op.between]: [lat - radius / 111, +lat + radius / 111] },
      longitude: { [Op.between]: [lng - radius / 111, +lng + radius / 111] }
    }
  }).then(w => res.json(w)).catch(next);
};

export const complete = (req, res, next) =>
  Workout.update({ completed: true }, { where: { id: req.params.id, userId: req.user.id } })
        .then(() => res.sendStatus(200)).catch(next);

export const scheduled = (req, res, next) =>
  Workout.findAll({ where: { userId: req.user.id, scheduledAt: { [Op.gt]: new Date() } } })
        .then(w => res.json(w)).catch(next);
