const jwt = require('jsonwebtoken');

const SECRET = 'hello';

const genToken = (payload) => {
  return jwt.sign(payload, SECRET);
};

const restrict = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const user = jwt.verify(token, SECRET);
    console.log(user);
    res.locals = user;
    next();
  } catch (e) {
    res.status(401).send('Not Authorized');
  }
}

module.exports = {
  genToken,
  restrict
};