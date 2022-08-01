const _url = (param = "") => {
  const baseUrl = _config.app.url
    .replace(/\/$/, "")
    .concat(":", _config.app.port);

  return new URL(baseUrl.concat("/", param.replace(/^\//, "")));
};

module.exports = _url;
