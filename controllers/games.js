const Games = require("../models/games");

const getAll = async (req, res) => {
  try {
    res.json(await Games.getAll());
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll
};
