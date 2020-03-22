const assert = require("assert");

const Recipe = require("../../models/recipes");

describe("Recipes Model", () => {
  describe("when params passed with preceding and trailing spaces", () => {
    it("whitespace is trimmed", () => {
      const recipe = new Recipe(
        "   title   ",
        "   slug   ",
        "   link   ",
        "   ingredients   ",
        "   directions   ",
        "   notes   "
      );

      assert.equal(recipe.title, "title");
      assert.equal(recipe.slug, "slug");
      assert.equal(recipe.referenceLink, "link");
      assert.equal(recipe.ingredients, "ingredients");
      assert.equal(recipe.directions, "directions");
      assert.equal(recipe.notes, "notes");
    });
  });

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
        assert.equal(recipe.isValid().valid, true);
      });
    });

    describe("when all parameters NOT passed", () => {
      it("returns false", () => {
        const recipe = new Recipe("", "", "", "", "", "");
        const { valid, message } = recipe.isValid();

        assert.equal(valid, false);
        assert.equal(
          message,
          "title, slug, ingredients, directions - fields are required"
        );
      });
    });

    describe("title parameter", () => {
      describe("when not passed", () => {
        it("returns false", () => {
          const recipe = new Recipe(
            "",
            "slug",
            "link",
            "ingredients",
            "directions",
            "notes"
          );
          const { valid, message } = recipe.isValid();

          assert.equal(valid, false);
          assert.equal(message, "title - fields are required");
        });
      });

      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const recipe = new Recipe(
            "   ",
            "slug",
            "link",
            "ingredients",
            "directions",
            "notes"
          );
          const { valid, message } = recipe.isValid();

          assert.equal(valid, false);
          assert.equal(message, "title - fields are required");
        });
      });
    });

    describe("slug parameter", () => {
      describe("when not passed", () => {
        it("returns false", () => {
          const recipe = new Recipe(
            "title",
            "",
            "link",
            "ingredients",
            "directions",
            "notes"
          );
          const { valid, message } = recipe.isValid();

          assert.equal(valid, false);
          assert.equal(message, "slug - fields are required");
        });
      });

      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const recipe = new Recipe(
            "title",
            "   ",
            "link",
            "ingredients",
            "directions",
            "notes"
          );
          const { valid, message } = recipe.isValid();

          assert.equal(valid, false);
          assert.equal(message, "slug - fields are required");
        });
      });
    });

    describe("referenceLink parameter", () => {
      describe("when not passed", () => {
        it("returns true", () => {
          const recipe = new Recipe(
            "title",
            "slug",
            "",
            "ingredients",
            "directions",
            "notes"
          );

          assert.equal(recipe.isValid().valid, true);
        });
      });
    });

    describe("ingredients parameter", () => {
      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const recipe = new Recipe(
            "title",
            "slug",
            "link",
            "   ",
            "directions",
            "notes"
          );
          const { valid, message } = recipe.isValid();

          assert.equal(valid, false);
          assert.equal(message, "ingredients - fields are required");
        });
      });

      describe("when not passed", () => {
        it("returns false", () => {
          const recipe = new Recipe(
            "title",
            "slug",
            "link",
            "",
            "directions",
            "notes"
          );
          const { valid, message } = recipe.isValid();

          assert.equal(valid, false);
          assert.equal(message, "ingredients - fields are required");
        });
      });
    });

    describe("directions parameter", () => {
      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const recipe = new Recipe(
            "title",
            "slug",
            "link",
            "ingredients",
            "   ",
            "notes"
          );
          const { valid, message } = recipe.isValid();

          assert.equal(valid, false);
          assert.equal(message, "directions - fields are required");
        });
      });

      describe("when not passed", () => {
        it("returns false", () => {
          const recipe = new Recipe(
            "title",
            "slug",
            "link",
            "ingredients",
            "",
            "notes"
          );
          const { valid, message } = recipe.isValid();

          assert.equal(valid, false);
          assert.equal(message, "directions - fields are required");
        });
      });
    });

    describe("notes parameter", () => {
      describe("when not passed", () => {
        it("returns true", () => {
          const recipe = new Recipe(
            "title",
            "slug",
            "link",
            "ingredients",
            "directions",
            "notes"
          );
          assert.equal(recipe.isValid().valid, true);
        });
      });
    });
  });
});
