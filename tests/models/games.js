const assert = require("assert");

const Game = require("../../models/games");

describe("Games Model", () => {
  describe("when params passed with preceding and trailing spaces", () => {
    it("whitespace is trimmed", () => {
      const game = new Game("   title   ", "   link   ", "   image   ", 1);

      assert.equal(game.title, "title");
      assert.equal(game.link, "link");
      assert.equal(game.image, "image");
    });
  });

  describe("isValid()", () => {
    describe("when all parameters passed", () => {
      it("returns true", () => {
        const game = new Game("title", "link", "image", 1);
        assert.equal(game.isValid().valid, true);
      });
    });

    describe("when no parameters are passed", () => {
      it("returns false", () => {
        const game = new Game("", "", "", "");
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
          const game = new Game("", "link", "image", 1);
          const { valid, message } = game.isValid();

          assert.equal(valid, false);
          assert.equal(message, "title - fields are required");
        });
      });
      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const game = new Game("   ", "link", "image", 1);
          const { valid, message } = game.isValid();

          assert.equal(valid, false);
          assert.equal(message, "title - fields are required");
        });
      });
    });

    describe("link parameter", () => {
      describe("when not passed", () => {
        it("returns false", () => {
          const game = new Game("title", "", "image", 1);
          const { valid, message } = game.isValid();

          assert.equal(valid, false);
          assert.equal(message, "link - fields are required");
        });
      });

      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const game = new Game("title", "   ", "image", 1);
          const { valid, message } = game.isValid();

          assert.equal(valid, false);
          assert.equal(message, "link - fields are required");
        });
      });
    });

    describe("image parameter", () => {
      describe("when not passed", () => {
        it("returns false", () => {
          const game = new Game("title", "link", "", 1);
          const { valid, message } = game.isValid();

          assert.equal(valid, false);
          assert.equal(message, "image - fields are required");
        });
      });

      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const game = new Game("title", "link", "   ", 1);
          const { valid, message } = game.isValid();

          assert.equal(valid, false);
          assert.equal(message, "image - fields are required");
        });
      });
    });

    describe("bggId parameter", () => {
      describe("when not passed", () => {
        it("returns false", () => {
          const game = new Game("title", "link", "image");
          const { valid, message } = game.isValid();

          assert.equal(valid, false);
          assert.equal(message, "bggId - fields are required");
        });
      });
    });
  });
});
