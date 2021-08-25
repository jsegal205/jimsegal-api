const sinon = require("sinon");
const mock = require("../mocks/mock-instance");

const controller = require("../../controllers/travel");

const { mockRequest, mockResponse } = require("./helpers");

describe("TravelController", () => {
  after(() => {
    mock.resetHandlers();
  });

  const apiUrl =
    "https://data.heroku.com/dataclips/zufupjioefakciimcrrnbzhbcwau.json";

  describe("getAll", () => {
    describe("when external request is successful", () => {
      it("should map and return data", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const apiReturn = {
          values: [
            ["City1", "State1", "Country1", 1, 2, ["Date 1", "Date 2"]],
            ["City2", "State2", "Country2", 3, 4, ["Date 3", "Date 4"]],
          ],
        };
        mock.onGet(apiUrl).reply(200, apiReturn);

        const mappedReturn = [
          {
            city: "City1",
            state: "State1",
            country: "Country1",
            lat: 1,
            lng: 2,
            visits: ["Date 1", "Date 2"],
          },
          {
            city: "City2",
            state: "State2",
            country: "Country2",
            lat: 3,
            lng: 4,
            visits: ["Date 3", "Date 4"],
          },
        ];

        await controller.getAll(req, res);

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

        await controller.getAll(req, res);

        sinon.assert.calledOnce(console.error);
        sinon.assert.calledOnceWithExactly(res.json, apiError);
      });
    });
  });
});
