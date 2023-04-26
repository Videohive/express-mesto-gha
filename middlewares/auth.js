const jwt = require('jsonwebtoken');
const { handleAuthErr } = require('../utils/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    handleAuthErr(res, 'Необходима авторизация');
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    handleAuthErr(res, 'Необходима авторизация');
  }
  req.user = payload;
  next();
};
