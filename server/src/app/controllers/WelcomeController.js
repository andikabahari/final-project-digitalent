const index = (req, res) => {
  // Render view
  return res.render("welcome");
};

module.exports = { index };
