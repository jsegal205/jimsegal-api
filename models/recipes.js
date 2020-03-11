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

module.exports = Recipe;
