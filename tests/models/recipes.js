const assert = require("assert");

const Recipe = require("../../models/recipes");

describe("Recipes Model", () => {
  describe("isValid()", () => {
    describe("when all parameters passed", () => {
      it("returns true", () => {
        const recipe = new Recipe(
          "title",
          "slug",
          "link",
          "ingredients",
          "directions",
          "notes"
        );
        assert.equal(recipe.isValid(), true);
      });
    });

    describe("when title parameter not passed", () => {
      it("returns false", () => {
        const recipe = new Recipe(
          "",
          "slug",
          "link",
          "ingredients",
          "directions"
        );
        assert.equal(recipe.isValid(), false);
      });
    });

    describe("when slug parameter not passed", () => {
      it("returns false", () => {
        const recipe = new Recipe(
          "title",
          "",
          "link",
          "ingredients",
          "directions"
        );
        assert.equal(recipe.isValid(), false);
      });
    });

    describe("when link parameter not passed", () => {
      it("returns true", () => {
        const recipe = new Recipe(
          "title",
          "slug",
          "",
          "ingredients",
          "directions"
        );
        assert.equal(recipe.isValid(), true);
      });
    });

    describe("when ingredients parameter not passed", () => {
      it("returns false", () => {
        const recipe = new Recipe("title", "slug", "link", "", "directions");
        assert.equal(recipe.isValid(), false);
      });
    });

    describe("when directions parameter not passed", () => {
      it("returns false", () => {
        const recipe = new Recipe("title", "slug", "link", "ingredients", "");
        assert.equal(recipe.isValid(), false);
      });
    });

    describe("when notes parameter not passed", () => {
      it("returns true", () => {
        const recipe = new Recipe(
          "title",
          "slug",
          "link",
          "ingredients",
          "directions",
          "notes"
        );
        assert.equal(recipe.isValid(), true);
      });
    });
  });
});
