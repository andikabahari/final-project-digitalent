const router = require("express").Router();

/**
 * middlewares
 */

//

/**
 * controllers
 */

const WelcomeController = require("../controllers/WelcomeController.js");

/**
 * routers
 */

router.get("/", WelcomeController.index);

module.exports = router;
