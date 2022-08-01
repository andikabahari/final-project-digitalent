const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

/**
 * MongoDB connection
 */

mongoose.connect(
  _config.db.url,
  _config.db.options
);

mongoose.connection.on("error", err =>
  console.log("Error: Could not connect to MongoDB.")
);

/**
 * view engine
 */

app.set("views", _config.app.views_path);
app.set("view engine", _config.app.view_engine);

/**
 * middlewares
 */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/**
 * static files
 */

app.use(express.static(_config.app.static_path));
app.get("*", (req, res) => res.sendFile(_config.app.static_path));

/**
 * routes
 */

app.use("/", require("./app/routes/web.js"));
app.use("/api", require("./app/routes/api.js"));

/**
 * 404 error handler
 */

app.use("/", (req, res) => {
  const response = _response.notFound("Page not found");
  res.status(response.status).render("errors/404", response);
});

/**
 * 500 error handler
 */

app.use((error, req, res, next) => {
  const response = _response.serverError(error.message);
  res.status(response.status).render("errors/500", response);
});

module.exports = app;
