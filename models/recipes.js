const { validateRequiredFields } = require("../utils/validation");

class Recipe {
  REQUIRED_FIELDS = ["title", "slug", "ingredients", "directions"];

  constructor({ title, slug, reference_link, ingredients, directions, notes }) {
    this.title = title.trim() || "";
    this.slug = slug.trim() || "";
    this.referenceLink = reference_link ? reference_link.trim() : "";
    this.ingredients = ingredients.trim() || "";
    this.directions = directions.trim() || "";
    this.notes = notes ? notes.trim() : "";
  }

  isValid = () => validateRequiredFields(this);
}

module.exports = Recipe;
