const Games = require("../models/games");

const getAll = async (req, res) => {
  try {
    res.json(await Games.getAll());
  } catch (error) {
    throw error;
  }
};

const getbgg = async (req, res) => {
  try {
    res.json(await Games.getbgg());
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  getbgg
};
