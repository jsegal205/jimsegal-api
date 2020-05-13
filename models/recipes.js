const { validateRequiredFields } = require("../utils/validation");
const { slugify } = require("../utils/url");

class Recipe {
  REQUIRED_FIELDS = ["title", "ingredients", "directions"];

  constructor({ title, slug, reference_link, ingredients, directions, notes }) {
    this.title = title ? title.trim() : "";
    this.slug = slug ? slug : slugify(this.title);
    this.referenceLink = reference_link ? reference_link.trim() : "";
    this.ingredients = ingredients ? ingredients.trim() : "";
    this.directions = directions ? directions.trim() : "";
    this.notes = notes ? notes.trim() : "";
  }

  isValid = () => validateRequiredFields(this);
}

module.exports = Recipe;
