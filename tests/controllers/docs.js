const chai = require("chai");
const expect = chai.expect;
const path = require("path");

const controller = require("../../controllers/docs");

const { mockRequest, mockResponse } = require("./helpers");

describe("DocsController", () => {
  describe("getAll", () => {
    it("should send ~/docs/index.html file", async () => {
      const req = mockRequest();
      const res = mockResponse();

      await controller.getAll(req, res);

      const expectPath = path.join(__dirname, "../../docs", "index.html");
      expect(res.sendFile.calledOnceWithExactly(expectPath)).to.be.true;
    });
  });
});
