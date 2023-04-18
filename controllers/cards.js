const Card = require('../models/card');
const {BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, handleErrors, handleErrorNotFound} = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate([
      { path: 'likes', model: 'user' },
      { path: 'owner', model: 'user' }
    ])
    .then(cards => res.status(200).send({ data: cards }))
    .catch((err) => console.log(err, res));
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user
  Card.create({ name, link, owner })
    .then(card => card.populate('owner'))
    .then(card => res.status(201).send({ data: card }))
    .catch((err) => handleErrors(err, res));
}

module.exports.deleteCard = (req, res) => {
  const _id = req.params.cardId;

  Card.findByIdAndDelete({ _id })
    .populate([
      { path: 'owner', model: 'user' }
    ])
    .then(card => {
      !card ? handleErrorNotFound(res, "Карточка с указанным id не найдена") : res.send({ data: card })
    })
    .catch((err) => handleErrors(err, res));
}