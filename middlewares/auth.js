const jwt = require('jsonwebtoken');
const { handleAuthErr } = require('../utils/errors');

const { JWT_SECRET } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    handleAuthErr(res, 'Необходима авторизация');
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    handleAuthErr(res, 'Необходима авторизация');
  }
  req.user = payload;
  next();
};
