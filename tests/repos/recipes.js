const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const db = require("../../db/pg");
const repo = require("../../repos/recipes");

describe("RecipeRepository", () => {
  describe("getAll", () => {
    it("should call to db to get data", async () => {
      const dbStub = sinon.stub(db, "query").returns([]);

      await repo.getAll();

      expect(dbStub.calledOnce).to.be.true;

      dbStub.restore();
    });
  });
});
