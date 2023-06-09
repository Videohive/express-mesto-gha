const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { handleErrors, handleErrorNotFound } = require('../utils/errors');

const { JWT_SECRET } = require('../utils/constants');

module.exports.getUserById = (req, res) => {
  const _id = req.params.userId;
  User.findById({ _id })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        handleErrorNotFound(res, 'Пользователь по указанному id не найден');
      }
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleErrors(err, res));
};

module.exports.getCurrentUser = (req, res) => {
  const { _id } = req.user;
  User.findById({ _id })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        handleErrorNotFound(res, 'Пользователь не найден');
      }
    })
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
      .then(() => res.status(201).send({
        data: {
          name, about, avatar, email,
        },
      }))
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
        res.send(user);
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
