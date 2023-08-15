const Card = require('../models/card');
const {
  NotFoundError,
  BadRequestError,
  ServerError,
  AccessError,
} = require('../errors/index');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => next(new ServerError('Произошла ошибка')));
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(new ServerError(`Произошла ошибка: ${err}`));
    });
}

function deleteCardById(req, res, next) {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new AccessError('Нельзя удалить карточку, загруженную другим пользователем');
      }
      card.deleteOne()
        .then(() => res.send({ message: 'Карточка удалена' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный ID карточки'));
      } else {
        next(err);
      }
    });
}

function setLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректный ID карточки'));
      }
      return next(err);
    });
}

function removeLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректный ID карточки'));
      }
      return next(err);
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  setLike,
  removeLike,
};
