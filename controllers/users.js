const User = require('../models/user');

module.exports.getUserById = (req, res) => {
  const _id = req.params.userId
  User.findById({ _id })
    .then(user => {
      res.send({ data: user })
    })
    .catch((err) => console.log(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => console.log(err, res));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch((err) => console.log(err, res));
};