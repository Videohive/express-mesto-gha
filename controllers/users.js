const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { handleErrors, handleErrorNotFound } = require('../utils/errors');

module.exports.getUserById = (req, res) => {
  const _id = req.params.userId;
  User.findById({ _id })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        handleErrorNotFound(res, 'Пользователь по указанному id не найден');
      }
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleErrors(err, res));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.status(201).send({ data: user }))
      .catch((err) => handleErrors(err, res));
  });
};

const updateUser = (req, res, updateData) => {
  User.findByIdAndUpdate(
    req.user._id,
    updateData,
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        handleErrorNotFound(res, 'Пользователь по указанному id не найден');
      }
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  updateUser(req, res, { name, about });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  updateUser(req, res, { avatar });
};
