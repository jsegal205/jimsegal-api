const assert = require("assert");

const Game = require("../../models/games");

describe("Games Model", () => {
  describe("isValid()", () => {
    describe("when all parameters passed", () => {
      it("returns true", () => {
        const game = new Game("title", "link", "image", 1);
        assert.equal(game.isValid(), true);
      });
    });

    describe("title parameter", () => {
      describe("when not passed", () => {
        it("returns false", () => {
          const game = new Game("", "link", "image", 1);
          assert.equal(game.isValid(), false);
        });
      });
      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const game = new Game("   ", "link", "image", 1);
          assert.equal(game.isValid(), false);
        });
      });
    });

    describe("link parameter", () => {
      describe("when not passed", () => {
        it("returns false", () => {
          const game = new Game("title", "", "image", 1);
          assert.equal(game.isValid(), false);
        });
      });

      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const game = new Game("title", "   ", "image", 1);
          assert.equal(game.isValid(), false);
        });
      });
    });

    describe("image parameter", () => {
      describe("when not passed", () => {
        it("returns false", () => {
          const game = new Game("title", "link", "", 1);
          assert.equal(game.isValid(), false);
        });
      });

      describe("when passed as all whitespace", () => {
        it("returns false", () => {
          const game = new Game("title", "link", "   ", 1);
          assert.equal(game.isValid(), false);
        });
      });
    });

    describe("bggId parameter", () => {
      describe("when not passed", () => {
        it("returns false", () => {
          const game = new Game("title", "link", "image");
          assert.equal(game.isValid(), false);
        });
      });
    });
  });
});
