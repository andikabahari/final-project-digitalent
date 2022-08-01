const Task = require("../../models/Task.js");

const find = (req, res) => {
  const match = {};

  if (req.user._id) match.createdBy = req.user._id;

  Task.find(match)
    .sort({ _id: -1 })
    .populate("createdBy", "fullName")
    .then(tasks => {
      const response = !tasks
        ? _response.notFound("Tasks not found")
        : _response.ok(tasks);

      res.status(response.status).json(response);
    })
    .catch(err => {
      const response = _response.serverError(err);
      res.status(response.status).json(response);
    });
};

const findOne = (req, res) => {
  const _id = req.params._id;

  Task.findOne({ _id })
    .then(task => {
      const response = !task
        ? _response.notFound("Task not found")
        : _response.ok(task);

      res.status(response.status).json(response);
    })
    .catch(err => {
      const response = _response.serverError(err);
      res.status(response.status).json(response);
    });
};

const create = (req, res) => {
  const newTask = new Task({
    createdBy: req.body.createdBy,
    title: req.body.title,
    description: req.body.description,
    isCompleted: req.body.isCompleted
  });

  newTask
    .save()
    .then(task => {
      task
        .populate("createdBy", "fullName")
        .execPopulate()
        .then(task => {
          const response = _response.ok(task);
          res.status(response.status).json(response);
        });
    })
    .catch(err => {
      const response = _response.serverError(err);
      res.status(response.status).json(response);
    });
};

const update = (req, res) => {
  const _id = req.body._id;

  Task.findOne({ _id })
    .then(task => {
      if (!task) {
        const response = _response.notFound("Task not found");
        return res.status(response.status).json(response);
      }

      if (req.body.title) task.title = req.body.title;
      task.description = req.body.description;
      task.isCompleted = req.body.isCompleted;

      task
        .save()
        .then(task => {
          task
            .populate("createdBy", "fullName")
            .execPopulate()
            .then(task => {
              const response = _response.ok(task);
              res.status(response.status).json(response);
            });
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

  Task.findOne({ _id })
    .then(task => {
      if (!task) {
        const response = _response.notFound("Task not found");
        return res.status(response.status).json(response);
      }

      task
        .remove()
        .then(task => {
          task
            .populate("createdBy", "fullName")
            .execPopulate()
            .then(task => {
              const response = _response.ok(task);
              res.status(response.status).json(response);
            });
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
