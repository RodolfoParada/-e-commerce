const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, 'test_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
};
