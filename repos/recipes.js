const Recipe = require("../models/recipes");
const db = require("../db/pg");

const getAll = async () => {
  const recipes = await db.query(
    "SELECT title, slug, reference_link, ingredients, directions, notes from recipes order by title"
  );

  return recipes.map(recipe => {
    return new Recipe(
      recipe.title,
      recipe.slug,
      recipe.reference_link,
      recipe.ingredients,
      recipe.directions,
      recipe.notes
    );
  });
};

module.exports = { getAll };
