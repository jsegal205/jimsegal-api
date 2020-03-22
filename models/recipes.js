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

  isValid = () => {
    const invalidFields = this.REQUIRED_FIELDS.reduce(
      (acc, currReqFieldName) => {
        if (!!this[currReqFieldName] === false) {
          acc.push(currReqFieldName);
        }
        return acc;
      },
      []
    );

    return {
      valid: invalidFields.length === 0,
      message:
        invalidFields.length === 0
          ? ""
          : `${invalidFields.join(", ")} - fields are required`
    };
  };
}

module.exports = Recipe;
