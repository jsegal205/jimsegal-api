import sinon from "sinon";
import path from "path";
import * as url from "url";

import * as controller from "../../controllers/docs.js";

import { mockRequest, mockResponse } from "./helpers/index.js";

describe("DocsController", () => {
  describe("getAll", () => {
    it("should send ~/docs/index.html file", async () => {
      const req = mockRequest();
      const res = mockResponse();

      await controller.getAll(req, res);

      const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

      const expectPath = path.join(__dirname, "../../docs", "index.html");
      sinon.assert.calledOnceWithExactly(res.sendFile, expectPath);
    });
  });
});
