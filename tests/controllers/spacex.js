const sinon = require("sinon");

const mock = require("../mocks/mock-instance");

const controller = require("../../controllers/spacex");

const { mockRequest, mockResponse } = require("./helpers");

describe("SpacexController", () => {
  after(() => {
    mock.resetHandlers();
  });

  describe("getNextLaunch", () => {
    const apiUrl = "https://api.spacexdata.com/v4/launches/next";

    describe("when external request is successful", () => {
      it("should map and return data", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const apiReturn = {
          name: "name",
          date_unix: "date_unix",
          date_utc: "date_utc",
          details: "details",
          rocket: "rocket",
          launchpad: "launchpad",
        };
        mock.onGet(apiUrl).reply(200, apiReturn);

        const rocketApiUrl = `https://api.spacexdata.com/v4/rockets/${apiReturn.rocket}`;
        const rocketApiReturn = { name: "rocket-name" };
        mock.onGet(rocketApiUrl).reply(200, rocketApiReturn);

        const launchpadApiUrl = `https://api.spacexdata.com/v4/launchpads/${apiReturn.launchpad}`;
        const launchpadApiReturn = { full_name: "launchpad-name" };
        mock.onGet(launchpadApiUrl).reply(200, launchpadApiReturn);

        const mappedReturn = {
          mission_name: apiReturn.name,
          date_unix: apiReturn.date_unix,
          date_utc: apiReturn.date_utc,
          details: apiReturn.details,
          rocket_name: rocketApiReturn.name,
          launchpad: launchpadApiReturn.full_name,
        };

        await controller.getNextLaunch(req, res);

        sinon.assert.calledOnceWithExactly(res.json, mappedReturn);
      });
    });

    describe("when following external request fails", () => {
      beforeEach(() => {
        sinon.stub(console, "error").callsFake(() => {});
      });

      afterEach(() => {
        console.error.restore();
      });

      it("returns error json", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const apiError = {
          message: "Request failed with status code 500",
          name: "Error",
        };
        mock.onGet(apiUrl).reply(500, apiError);

        await controller.getNextLaunch(req, res);

        sinon.assert.calledOnce(console.error);
        sinon.assert.calledOnceWithExactly(res.json, apiError);
      });
    });
  });
});
