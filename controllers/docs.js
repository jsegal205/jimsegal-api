const path = require("path");

const getAll = async (req, res) => {
  res.sendFile(path.join(__dirname, "../docs", "index.html"));
};

module.exports = {
  getAll,
};
