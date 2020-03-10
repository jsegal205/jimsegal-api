const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const model = require("../../models/games");
const controller = require("../../controllers/games");

const { mockRequest, mockResponse } = require("./helpers");

describe("GamesController", () => {
  describe("getAll", () => {
    it("should call to model", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const stub = sinon.stub(model, "getAll");

      await controller.getAll(req, res);

      expect(stub.calledOnce).to.be.true;

      stub.restore();
    });
  });
});
