const sinon = require("sinon");
const mock = require("../mocks/mock-instance");

const controller = require("../../controllers/weather");
const Location = require("../../controllers/location");
const { expect } = require("chai");

const { mockRequest, mockResponse } = require("./helpers");

describe("WeatherController", () => {
  let locationReturn;
  before(() => {
    locationReturn = { city: "cityFake", state: "stateFake" };
    sinon.stub(Location, "getBy").callsFake(() => locationReturn);
  });

  after(() => {
    mock.resetHandlers();
  });
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  describe("getTemp", () => {
    describe("when external request is successful", () => {
      it("should return data", async () => {
        const lat = 1;
        const long = 2;

        process.env.OPENWEATHERMAP_API_KEY = "fake_key";

        const apiReturn = {
          main: { temp: 1 },
        };

        const mappedReturn = {
          city: locationReturn.city,
          lat,
          long,
          state: locationReturn.state,
          temperature: 1,
          units: "imperial",
        };

        mock
          .onGet(
            `${apiUrl}?appid=fake_key&units=imperial&lat=${lat}&lon=${long}`
          )
          .reply(200, apiReturn);

        const actualReturn = await controller.getTemp(lat, long);

        expect(actualReturn).to.deep.equal(mappedReturn);
      });
    });

    describe("when following external request fails", () => {
      it("returns error", async () => {
        process.env.OPENWEATHERMAP_API_KEY = "fake_key";

        const apiError = {
          message: "Request failed with status code 500",
          name: "Error",
        };
        mock.onGet(apiUrl).reply(500, apiError);

        expect(await controller.getTemp("1", "2")).to.throw;
      });
    });
  });

  describe("isAnchorageColderThan", () => {
    describe("when parameters are valid", () => {
      it("returns data", async () => {
        process.env.OPENWEATHERMAP_API_KEY = "fake_key";

        const req = mockRequest({ params: { lat: 3, long: 4 } });
        const res = mockResponse();

        const akReturn = {
          city: "cityFake",
          lat: "61.2175",
          long: "-149.8584",
          state: "stateFake",
          temperature: 1,
          units: "imperial",
        };

        mock
          .onGet(
            `${apiUrl}?appid=fake_key&units=imperial&lat=61.2175&lon=-149.8584`
          )
          .reply(200, {
            main: { temp: 1 },
          });

        const compareReturn = {
          city: "cityFake",
          lat: "3",
          long: 4,
          state: "stateFake",
          temperature: 2,
          units: "imperial",
        };

        mock
          .onGet(`${apiUrl}?appid=fake_key&units=imperial&lat=3&lon=4`)
          .reply(200, {
            main: { temp: 2 },
          });

        await controller.isAnchorageColderThan(req, res);

        sinon.assert.calledOnceWithExactly(res.json, {
          isAnchorageColder: true,
          anchorageDetails: akReturn,
          compareDetails: compareReturn,
        });
      });
    });
  });
});
