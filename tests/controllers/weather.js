const sinon = require("sinon");
const mock = require("../mocks/mock-instance");

const controller = require("../../controllers/weather");
const Location = require("../../controllers/location");
const { expect } = require("chai");

describe("WeatherController", () => {
  describe("getTemp", () => {
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

    describe("when external request is successful", () => {
      it("should return data", async () => {
        const lat = 1;
        const long = 2;

        process.env.OPENWEATHERMAP_API_KEY = "fake_key";

        const apiReturn = {
          main: { temp: 1 },
        };

        const locationReturn = { city: "cityFake", state: "stateFake" };

        sinon.stub(Location, "getBy").callsFake(() => locationReturn);

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

        // console.log(mock.handlers.get[mock.handlers.get.length - 1][0]);
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
});
