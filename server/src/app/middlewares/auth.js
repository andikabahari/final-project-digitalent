const jwt = require("jsonwebtoken");

const ensure = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    const response = _response.forbidden("Authorizaton denied");
    return res.status(response.status).json(response);
  }

  try {
    req.user = jwt.verify(token, _config.jwt.secret);
    next();
  } catch (e) {
    const response = _response.badRequest("Token is not valid");
    res.status(response.status).json(response);
  }
};

const check = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    req.user = jwt.verify(token, _config.jwt.secret);
  } catch (e) {
    req.user = { _id: null };
  }

  next();
};

module.exports = { ensure, check };
