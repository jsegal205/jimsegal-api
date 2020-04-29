const repo = require("../repos/games");

const getAll = async (req, res) => {
  try {
    res.json(await repo.getAll());
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
};
