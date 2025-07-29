import Route from '../models/Route.js';
import { Op } from 'sequelize';

export const list = (req, res, next) =>
  Route.findAll({ where: { userId: req.user.id } })
       .then(data => res.json(data))
       .catch(next);


export const create = (req, res, next) =>
  Route.create({ ...req.body, userId: req.user.id }).then(r => res.status(201).json(r)).catch(next);

export const update = (req, res, next) =>
  Route.update(req.body, { where: { id: req.params.id, userId: req.user.id }, returning: true, plain: true })
       .then(([_, r]) => res.json(r)).catch(next);

export const remove = (req, res, next) =>
  Route.destroy({ where: { id: req.params.id, userId: req.user.id } })
       .then(() => res.sendStatus(204)).catch(next);

export const popular = (req, res, next) => {
  const { lat, lng, radius = 20 } = req.query;
  Route.findAll({
    where: {
      latitude: { [Op.between]: [lat - radius / 111, +lat + radius / 111] },
      longitude: { [Op.between]: [lng - radius / 111, +lng + radius / 111] }
    },
    order: [['createdAt', 'DESC']],
    limit: 10
  }).then(res.json).catch(next);
};

export const recordTime = (req, res) =>
  res.json({ message: 'Tiempo registrado', routeId: req.params.id, time: req.body.timeSec });
