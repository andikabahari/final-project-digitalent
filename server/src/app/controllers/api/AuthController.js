const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.js");

const findOne = (req, res) => {
  const _id = req.user._id;

  User.findOne({ _id })
    .select("-password")
    .then(user => {
      const response = !user
        ? _response.notFound("User not found")
        : _response.ok(user);

      res.status(response.status).json(response);
    })
    .catch(err => {
      const response = _response.serverError(err);
      res.status(response.status).json(response);
    });
};

const create = (req, res) => {
  const newUser = new User({
    fullName: req.body.fullName,
    username: req.body.username,
    password: req.body.password
  });

  newUser
    .save()
    .then(user => {
      const keys = Object.keys(user.toJSON()).filter(key => key !== "password");
      const response = _response.ok(
        Object.keys(user.toJSON())
          .filter(key => keys.includes(key))
          .reduce((obj, key) => {
            obj[key] = user[key];
            return obj;
          }, {})
      );

      res.status(response.status).json(response);
    })
    .catch(err => {
      const response = _response.serverError(err);
      res.status(response.status).json(response);
    });
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const response = _response.badRequest("Please enter all fields");
    return res.status(response.status).json(response);
  }

  User.findOne({ username }).then(user => {
    if (!user) {
      const response = _response.notFound("User not found");
      return res.status(response.status).json(response);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        const response = _response.badRequest("Invalid credentials");
        return res.status(response.status).json(response);
      }

      jwt.sign(
        { _id: user._id },
        _config.jwt.secret,
        { expiresIn: _config.jwt.expires },
        (err, token) => {
          const keys = Object.keys(user.toJSON()).filter(
            key => key !== "password"
          );

          const response = err
            ? _response.serverError(err)
            : _response.ok({
                token,
                user: Object.keys(user.toJSON())
                  .filter(key => keys.includes(key))
                  .reduce((obj, key) => {
                    obj[key] = user[key];
                    return obj;
                  }, {})
              });

          res.status(response.status).json(response);
        }
      );
    });
  });
};

module.exports = {
  findOne,
  login,
  create
};
