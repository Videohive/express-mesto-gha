const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate([
      { path: 'likes', model: 'user' },
      { path: 'owner', model: 'user' }
    ])
    .then(cards => res.send({ data: cards }))
    .catch((err) => console.log(err, res));
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user
  Card.create({ name, link, owner })
    .then(card => card.populate('owner'))
    .then(card => res.send({ data: card }))
    .catch((err) => console.log(err, res));
}

module.exports.deleteCard = (req, res) => {
  const _id = req.params.cardId;

  Card.findByIdAndDelete({ _id })
    .populate([
      { path: 'owner', model: 'user' }
    ])
    .then(card => {
      res.send({ data: card })
    })
    .catch((err) => console.log(err, res));
}