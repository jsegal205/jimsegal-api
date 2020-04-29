const assert = require("assert");

const Game = require("../../models/games");

describe("Games Model", () => {
  const allParams = { title: "title", link: "link", image: "image", bggId: 1 };

  describe("when params passed with preceding and trailing spaces", () => {
    it("whitespace is trimmed", () => {
      const testParams = {
        title: "   title   ",
        link: "   link   ",
        image: "   image   "
      };
      const game = new Game(testParams);

      assert.equal(game.title, "title");
      assert.equal(game.link, "link");
      assert.equal(game.image, "image");
    });
  });

  describe("isValid()", () => {
    describe("when all parameters passed", () => {
      it("returns true", () => {
        const game = new Game(allParams);
        assert.equal(game.isValid().valid, true);
      });
    });

    describe("when no parameters are passed", () => {
      it("returns false", () => {
        const testParams = {
          title: "",
          link: "",
          image: "",
          bggId: ""
        };
        const game = new Game(testParams);
        const { valid, message } = game.isValid();

        assert.equal(valid, false);
        assert.equal(
          message,
          "title, link, image, bggId - fields are required"
        );
      });
    });

    describe("title parameter", () => {
      describe("when not passed", () => {
        it("returns false", () => {
          const testParams = { ...allParams, title: "" };
          const game = new Game(testParams);
          const { valid, message } = game.isValid();

          assert.equal(valid, false);
          assert.equal(message, "title - fields are required");
        });
      });

      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const testParams = { ...allParams, title: "   " };
          const game = new Game(testParams);
          const { valid, message } = game.isValid();

          assert.equal(valid, false);
          assert.equal(message, "title - fields are required");
        });
      });
    });

    describe("link parameter", () => {
      describe("when not passed", () => {
        it("returns false", () => {
          const testParams = { ...allParams, link: "" };
          const game = new Game(testParams);
          const { valid, message } = game.isValid();

          assert.equal(valid, false);
          assert.equal(message, "link - fields are required");
        });
      });

      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const testParams = { ...allParams, link: "   " };
          const game = new Game(testParams);
          const { valid, message } = game.isValid();

          assert.equal(valid, false);
          assert.equal(message, "link - fields are required");
        });
      });
    });

    describe("image parameter", () => {
      describe("when not passed", () => {
        it("returns false", () => {
          const testParams = { ...allParams, image: "" };
          const game = new Game(testParams);
          const { valid, message } = game.isValid();

          assert.equal(valid, false);
          assert.equal(message, "image - fields are required");
        });
      });

      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const testParams = { ...allParams, image: "   " };
          const game = new Game(testParams);
          const { valid, message } = game.isValid();

          assert.equal(valid, false);
          assert.equal(message, "image - fields are required");
        });
      });
    });

    describe("bggId parameter", () => {
      describe("when not passed", () => {
        it("returns false", () => {
          const { bggId, ...rest } = allParams;
          const game = new Game(rest);
          const { valid, message } = game.isValid();

          assert.equal(valid, false);
          assert.equal(message, "bggId - fields are required");
        });
      });
    });
  });
});
