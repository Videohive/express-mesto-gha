const User = require('../models/user');

module.exports.createUser = (req, res) => {
  //console.log(req.body);
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ user }))
    .catch((err) => console.log(err));
};