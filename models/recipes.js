const db = require("../db/pg");
const selectAll =
  "SELECT title, slug, reference_link, ingredients, directions, notes from recipes";

class Recipe {
  constructor(title, slug, referenceLink, ingredients, directions, notes) {
    this.title = title || "";
    this.slug = slug || "";
    this.referenceLink = referenceLink || "";
    this.ingredients = ingredients || "";
    this.directions = directions || "";
    this.notes = notes || "";
  }

  isValid = () =>
    [
      this.title,
      this.slug,
      this.referenceLink,
      this.ingredients,
      this.directions
    ].every(param => !!param);
}

const getAll = async () => {
  const results = await db.query(`${selectAll} order by title`);

  return results.map(recipe => {
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

const getBySlug = async slug => {
  const results = await db.query(`${selectAll} where slug = $1`, [slug]);

  if (results.length === 0) {
    return null;
  }

  const recipe = results[0];
  return new Recipe(
    recipe.title,
    recipe.slug,
    recipe.reference_link,
    recipe.ingredients,
    recipe.directions,
    recipe.notes
  );
};

module.exports = { getAll, getBySlug, Recipe };
