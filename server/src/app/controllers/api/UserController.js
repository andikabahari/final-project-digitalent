const User = require("../../models/User.js");

const find = (req, res) => {
  User.find({})
    .sort({ _id: -1 })
    .select("-password")
    .then(users => {
      const response = !users
        ? _response.notFound("Users not found")
        : _response.ok(users);

      res.status(response.status).json(response);
    })
    .catch(err => {
      const response = _response.serverError(err);
      res.status(response.status).json(response);
    });
};

const findOne = (req, res) => {
  const _id = req.params._id;

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

const update = (req, res) => {
  const _id = req.body._id;

  User.findOne({ _id })
    .then(user => {
      if (!user) {
        const response = _response.notFound("User not found");
        return res.status(response.status).json(response);
      }

      if (req.body.fullName) user.fullName = req.body.fullName;
      if (req.body.username) user.username = req.body.username;
      if (req.body.password) user.password = req.body.password;
      if (req.body.role) user.role = req.body.role;

      user
        .save()
        .then(user => {
          const keys = Object.keys(user.toJSON()).filter(
            key => key !== "password"
          );

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
    })
    .catch(err => {
      const response = _response.serverError(err);
      res.status(response.status).json(response);
    });
};

const destroy = (req, res) => {
  const _id = req.body._id;

  User.findOne({ _id })
    .then(user => {
      if (!user) {
        const response = _response.notFound("User not found");
        return res.status(response.status).json(response);
      }

      user
        .remove()
        .then(user => {
          const keys = Object.keys(user.toJSON()).filter(
            key => key !== "password"
          );

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
    })
    .catch(err => {
      const response = _response.serverError(err);
      res.status(response.status).json(response);
    });
};

module.exports = {
  find,
  findOne,
  create,
  update,
  destroy
};
