const db = require("../db/pg");

class Recipe {
  constructor(title, slug, referenceLink, ingredients, directions) {
    this.title = title || "";
    this.slug = slug || "";
    this.referenceLink = referenceLink || "";
    this.ingredients = ingredients || "";
    this.directions = directions || "";
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
  const recipes = await db.query(
    "SELECT title, slug, reference_link, ingredients, directions from recipes"
  );

  return recipes.map(recipe => {
    return new Recipe(
      recipe.title,
      recipe.slug,
      recipe.reference_link,
      recipe.ingredients,
      recipe.directions
    );
  });
};

module.exports = { getAll, Recipe };
