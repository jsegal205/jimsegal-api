const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

// const repo = require("../../repos/games");
const controller = require("../../controllers/games");

const { mockRequest, mockResponse } = require("./helpers");

describe("GamesController", () => {
  describe("getAll", () => {
    xit("should call to repo", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const stub = sinon.stub(repo, "getAll");

      await controller.getAll(req, res);

      expect(stub.calledOnce).to.be.true;

      stub.restore();
    });
  });
});
