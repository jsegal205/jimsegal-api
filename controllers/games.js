const Games = require("../models/games");

const getAll = async (req, res) => {
  try {
    res.json(await Games.getAllGames());
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll
};
