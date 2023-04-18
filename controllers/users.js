const User = require('../models/user');
const {BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, handleErrors, handleErrorNotFound} = require('../utils/errors');

module.exports.getUserById = (req, res) => {
  const _id = req.params.userId
  User.findById({ _id })
    .then(user => {
      handleErrorNotFound(user, res, "Пользователь по указанному _id не найден.")
      res.status(200).send({ data: user })
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.status(201).send({ data: user }))
    .catch((err) => handleErrors(err, res));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).send({ data: users }))
    .catch((err) => handleErrors(err, res));
};