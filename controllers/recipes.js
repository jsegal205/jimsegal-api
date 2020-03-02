const Recipes = require("../models/recipes");

const getAll = async (req, res) => {
  try {
    res.json(await Recipes.getAll());
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll
};
