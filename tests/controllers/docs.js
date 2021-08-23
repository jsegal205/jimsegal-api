const sinon = require("sinon");
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
      sinon.assert.calledOnceWithExactly(res.sendFile, expectPath);
    });
  });
});
