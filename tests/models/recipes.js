const assert = require("assert");

const Recipe = require("../../models/recipes");

const { slugify } = require("../../utils/url");

describe("Recipes Model", () => {
  const allParams = {
    title: "title",
    reference_link: "link",
    ingredients: "ingredients",
    directions: "directions",
    notes: "notes",
  };

  describe("when params passed with preceding and trailing spaces", () => {
    it("whitespace is trimmed", () => {
      const testParams = {
        title: "   title   ",
        reference_link: "   link   ",
        ingredients: "   ingredients   ",
        directions: "   directions   ",
        notes: "   notes   ",
      };
      const recipe = new Recipe(testParams);

      assert.equal(recipe.title, "title");
      assert.equal(recipe.slug, "title");
      assert.equal(recipe.referenceLink, "link");
      assert.equal(recipe.ingredients, "ingredients");
      assert.equal(recipe.directions, "directions");
      assert.equal(recipe.notes, "notes");
    });
  });

  describe("generated properties", () => {
    describe("slug", () => {
      it("should return slugified title", () => {
        const testParams = { title: "one two 1234567890" };
        const recipe = new Recipe(testParams);

        assert.equal(recipe.slug, slugify(testParams.title));
      });
    });
  });

  describe("isValid()", () => {
    describe("when all parameters passed", () => {
      it("returns true", () => {
        const recipe = new Recipe(allParams);
        assert.equal(recipe.isValid().valid, true);
      });
    });

    describe("when all parameters are passed as blank strings", () => {
      it("returns false", () => {
        const testParams = {
          title: "",
          reference_link: "",
          ingredients: "",
          directions: "",
          notes: "",
        };
        const recipe = new Recipe(testParams);
        const { valid, message } = recipe.isValid();

        assert.equal(valid, false);
        assert.equal(
          message,
          "title, ingredients, directions - fields are required"
        );
      });
    });

    describe("when empty object passed", () => {
      it("returns false", () => {
        const recipe = new Recipe({});
        const { valid, message } = recipe.isValid();

        assert.equal(valid, false);
        assert.equal(
          message,
          "title, ingredients, directions - fields are required"
        );
      });
    });

    describe("title parameter", () => {
      describe("when not passed", () => {
        it("returns false", () => {
          const testParams = { ...allParams, title: "" };
          const recipe = new Recipe(testParams);
          const { valid, message } = recipe.isValid();

          assert.equal(valid, false);
          assert.equal(message, "title - fields are required");
        });
      });

      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const testParams = { ...allParams, title: "   " };
          const recipe = new Recipe(testParams);
          const { valid, message } = recipe.isValid();

          assert.equal(valid, false);
          assert.equal(message, "title - fields are required");
        });
      });
    });

    describe("reference_link parameter", () => {
      describe("when not passed", () => {
        it("returns true", () => {
          const testParams = { ...allParams, reference_link: "" };
          const recipe = new Recipe(testParams);

          assert.equal(recipe.isValid().valid, true);
        });
      });

      describe("when passed as null", () => {
        it("returns true", () => {
          const testParams = { ...allParams, reference_link: null };
          const recipe = new Recipe(testParams);

          assert.equal(recipe.isValid().valid, true);
        });
      });
    });

    describe("ingredients parameter", () => {
      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const testParams = { ...allParams, ingredients: "   " };
          const recipe = new Recipe(testParams);
          const { valid, message } = recipe.isValid();

          assert.equal(valid, false);
          assert.equal(message, "ingredients - fields are required");
        });
      });

      describe("when not passed", () => {
        it("returns false", () => {
          const testParams = { ...allParams, ingredients: "" };
          const recipe = new Recipe(testParams);
          const { valid, message } = recipe.isValid();

          assert.equal(valid, false);
          assert.equal(message, "ingredients - fields are required");
        });
      });
    });

    describe("directions parameter", () => {
      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const testParams = { ...allParams, directions: "   " };
          const recipe = new Recipe(testParams);
          const { valid, message } = recipe.isValid();

          assert.equal(valid, false);
          assert.equal(message, "directions - fields are required");
        });
      });

      describe("when not passed", () => {
        it("returns false", () => {
          const testParams = { ...allParams, directions: "" };
          const recipe = new Recipe(testParams);
          const { valid, message } = recipe.isValid();

          assert.equal(valid, false);
          assert.equal(message, "directions - fields are required");
        });
      });
    });

    describe("notes parameter", () => {
      describe("when not passed", () => {
        it("returns true", () => {
          const testParams = { ...allParams, notes: "" };
          const recipe = new Recipe(testParams);
          assert.equal(recipe.isValid().valid, true);
        });
      });

      describe("when passed as null", () => {
        it("returns true", () => {
          const testParams = { ...allParams, notes: null };
          const recipe = new Recipe(testParams);
          assert.equal(recipe.isValid().valid, true);
        });
      });
    });
  });
});
