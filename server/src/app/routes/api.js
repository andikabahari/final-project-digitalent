const router = require("express").Router();

/**
 * middlewares
 */

const auth = require("../middlewares/auth.js");

/**
 * controllers
 */

const AuthController = require("../controllers/api/AuthController.js");
const UserController = require("../controllers/api/UserController.js");
const TaskController = require("../controllers/api/TaskController.js");

/**
 * routers
 */

router.post("/auth/user", auth.ensure, AuthController.findOne);
router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.create);

router.get("/users", UserController.find);
router.get("/users/:_id", UserController.findOne);
router.post("/users", UserController.create);
router.put("/users", UserController.update);
router.delete("/users", UserController.destroy);

router.get("/tasks", auth.check, TaskController.find);
router.get("/tasks/:_id", TaskController.findOne);
router.post("/tasks", TaskController.create);
router.put("/tasks", TaskController.update);
router.delete("/tasks", TaskController.destroy);

module.exports = router;
