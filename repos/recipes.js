const Recipe = require("../models/recipes");
const db = require("../db/pg");

const selectAll =
  "SELECT title, slug, reference_link, ingredients, directions, notes from recipes";

const getAll = async () => {
  const recipes = await db.query(`${selectAll} order by title`);

  return recipes.map((recipe) => {
    return new Recipe(recipe);
  });
};

const getBySlug = async (slug) => {
  const results = await db.query(`${selectAll} where slug = $1`, [slug]);

  if (results.length === 0) {
    return null;
  }

  const recipe = results[0];
  return new Recipe(recipe);
};

const create = params => {};

module.exports = { create, getAll, getBySlug };
