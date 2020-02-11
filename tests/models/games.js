const assert = require("assert");

const model = require("../../models/games");

describe("Games Model", () => {
  describe("isValid()", () => {
    describe("when all parameters passed", () => {
      it("returns true", () => {
        const game = new model.Game("title", "link", "image", "bggId");
        assert.equal(game.isValid(), true);
      });
    });

    describe("when title parameter not passed", () => {
      it("returns false", () => {
        const game = new model.Game("", "link", "image", "bggId");
        assert.equal(game.isValid(), false);
      });
    });

    describe("when link parameter not passed", () => {
      it("returns false", () => {
        const game = new model.Game("title", "", "image", "bggId");
        assert.equal(game.isValid(), false);
      });
    });

    describe("when image parameter not passed", () => {
      it("returns false", () => {
        const game = new model.Game("title", "link", "", "bggId");
        assert.equal(game.isValid(), false);
      });
    });

    describe("when bggId parameter not passed", () => {
      it("returns false", () => {
        const game = new model.Game("title", "link", "image", "");
        assert.equal(game.isValid(), false);
      });
    });
  });
});
