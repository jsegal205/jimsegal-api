const controller = require("../../controllers/health");
const sinon = require("sinon");

const { mockRequest, mockResponse } = require("./helpers");

describe("HealthController", () => {
  describe("get", () => {
    describe("when heroku envs not set", () => {
      it("should return `<dev>` as values", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const expected = {
          app_name: "<dev>",
          commit: "<dev>",
          updated_at: "<dev>",
        };

        await controller.get(req, res);

        sinon.assert.calledOnceWithExactly(res.json, expected);
      });
    });

    describe("when heroku envs are set", () => {
      it("should return `<dev>` as values", async () => {
        const req = mockRequest();
        const res = mockResponse();

        process.env.HEROKU_APP_NAME = "HEROKU_APP_NAME";
        process.env.HEROKU_SLUG_COMMIT = "HEROKU_SLUG_COMMIT";
        process.env.HEROKU_RELEASE_CREATED_AT = "HEROKU_RELEASE_CREATED_AT";

        const expected = {
          app_name: "HEROKU_APP_NAME",
          commit: "HEROKU_SLUG_COMMIT",
          updated_at: "HEROKU_RELEASE_CREATED_AT",
        };

        await controller.get(req, res);

        sinon.assert.calledOnceWithExactly(res.json, expected);
      });
    });
  });
});
