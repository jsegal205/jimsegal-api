const { validateRequiredFields } = require("../utils/validation");

class Recipe {
  REQUIRED_FIELDS = ["title", "slug", "ingredients", "directions"];

  constructor(title, slug, referenceLink, ingredients, directions, notes) {
    this.title = title.trim() || "";
    this.slug = slug.trim() || "";
    this.referenceLink = referenceLink.trim() || "";
    this.ingredients = ingredients.trim() || "";
    this.directions = directions.trim() || "";
    this.notes = notes.trim() || "";
  }

  isValid = () => validateRequiredFields(this);
}

module.exports = Recipe;
