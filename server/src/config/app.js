const path = require("path");

const staticPath = {
  default: path.join(__basepath, "public"),
  client: path.resolve(__basepath, "../client/build")
};

module.exports = {
  // Base URL
  url: "http://localhost",

  // Server port
  port: process.env.PORT || 5000,

  // Application view engine
  view_engine: "ejs",

  // Views path
  views_path: path.join(__basepath, "app/views"),

  // Static files path
  static_path: staticPath.default
};
