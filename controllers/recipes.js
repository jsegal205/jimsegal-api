const Recipes = require("../models/recipes");

const getAll = async (req, res) => {
  try {
    res.json(await Recipes.getAll());
  } catch (error) {
    throw error;
  }
};

const getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const recipe = await Recipes.getBySlug(slug);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).send("Does not exist");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  getBySlug
};
