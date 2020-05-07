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

const create = async (params) => {
  const recipe = new Recipe(params);
  const { valid, message } = recipe.isValid();
  if (valid) {
    const {
      title,
      slug,
      referenceLink,
      ingredients,
      directions,
      notes,
    } = recipe;

    await db.query(
      `
      INSERT INTO recipes(title, slug, reference_link, ingredients, directions, notes)
      VALUES ($1, $2, $3, $4, $5, $6);
    `,
      [title, slug, referenceLink, ingredients, directions, notes]
    );

    return {
      persisted: true,
      recipe: {
        title,
        slug,
        referenceLink,
        ingredients,
        directions,
        notes,
      },
    };
  }

  return { persisted: false, message };
};

module.exports = { create, getAll, getBySlug };
