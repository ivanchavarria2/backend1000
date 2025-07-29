import Exercise from '../models/Exercise.js';

export const catalog = (_req, res, next) =>
  Exercise.findAll()
          .then(data => res.json(data))
          .catch(next);
export const create = (req, res, next) =>
  Exercise.create({ ...req.body, userId: req.user.id })
          .then(e => res.status(201).json(e)).catch(next);

export const getOne = (req, res, next) =>
  Exercise.findByPk(req.params.id)
          .then(e => e ? res.json(e)           
                       : res.sendStatus(404))
          .catch(next);

export const update = (req, res, next) =>
  Exercise.update(req.body, { where: { id: req.params.id, userId: req.user.id }, returning: true, plain: true })
          .then(([_, e]) => res.json(e)).catch(next);

export const remove = (req, res, next) =>
  Exercise.destroy({ where: { id: req.params.id, userId: req.user.id } })
          .then(() => res.sendStatus(204)).catch(next);

export const byCategory = (req, res, next) =>
  Exercise.findAll({ where: { category: req.params.category } })
          .then(data => res.json(data))        
          .catch(next);
