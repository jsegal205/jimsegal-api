import sinon from "sinon";
import { expect } from "chai";

import mock from "../mocks/mock-instance.js";

import * as controller from "../../controllers/weather.js";

import { mockRequest, mockResponse } from "./helpers/index.js";

describe("WeatherController", () => {
  after(() => {
    mock.resetHandlers();
  });
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  const dailyApiUrl = "https://api.openweathermap.org/data/2.5/forecast/daily";

  const locationApiUrl = "https://www.mapquestapi.com/geocoding/v1/reverse";
  const locationReturn = {
    results: [
      {
        locations: [{ adminArea5: "cityFake", adminArea3: "stateFake" }],
      },
    ],
  };

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
          city: "cityFake",
          lat,
          long,
          state: "stateFake",
          temperature: 1,
          units: "imperial",
        };

        mock
          .onGet(`${locationApiUrl}?key=fake_key&location=${lat},${long}`)
          .reply(200, locationReturn);

        mock
          .onGet(
            `${apiUrl}?appid=fake_key&units=imperial&lat=${lat}&lon=${long}`,
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

        mock
          .onGet(`${locationApiUrl}?key=fake_key&location=1,2`)
          .reply(200, locationReturn);

        mock.onGet(apiUrl).reply(500, apiError);

        expect(await controller.getTemp("1", "2")).to.throw;
      });
    });
  });

  describe("getDailyMaxTemp", () => {
    describe("when external request is successful", () => {
      it("should return data", async () => {
        const lat = 1;
        const long = 2;

        process.env.OPENWEATHERMAP_API_KEY = "fake_key";

        const apiReturn = {
          list: [
            {
              temp: {
                max: 99,
              },
            },
          ],
        };

        const mappedReturn = {
          city: "cityFake",
          lat,
          long,
          state: "stateFake",
          maxTemperature: 99,
          units: "imperial",
        };

        mock
          .onGet(`${locationApiUrl}?key=fake_key&location=${lat},${long}`)
          .reply(200, locationReturn);

        mock
          .onGet(
            `${dailyApiUrl}?appid=fake_key&units=imperial&cnt=1&lat=${lat}&lon=${long}`,
          )
          .reply(200, apiReturn);

        const actualReturn = await controller.getDailyMaxTemp(lat, long);

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

        mock
          .onGet(`${locationApiUrl}?key=fake_key&location=1,2`)
          .reply(200, locationReturn);

        mock.onGet(dailyApiUrl).reply(500, apiError);

        expect(await controller.getDailyMaxTemp("1", "2")).to.throw;
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
          .onGet(`${locationApiUrl}?key=fake_key&location=61.2175,-149.8584`)
          .reply(200, locationReturn);

        mock
          .onGet(
            `${apiUrl}?appid=fake_key&units=imperial&lat=61.2175&lon=-149.8584`,
          )
          .reply(200, {
            main: { temp: 1 },
          });

        const compareReturn = {
          city: "cityFake",
          lat: 3,
          long: 4,
          state: "stateFake",
          temperature: 2,
          units: "imperial",
        };

        mock
          .onGet(`${locationApiUrl}?key=fake_key&location=3,4`)
          .reply(200, locationReturn);

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

    describe("when lat and long parameter are not passed", () => {
      it("returns 422 error", async () => {
        const req = mockRequest({ params: {} });
        const res = mockResponse();

        await controller.isAnchorageColderThan(req, res);

        sinon.assert.calledOnceWithExactly(res.status, 422);
        sinon.assert.calledOnceWithExactly(
          res.send,
          "Invalid route parameters sent. Only float type are allowed",
        );
      });
    });

    describe("when lat parameter is invalid", () => {
      it("returns 422 error", async () => {
        const req = mockRequest({ params: { lat: "invalid", long: 4 } });
        const res = mockResponse();

        await controller.isAnchorageColderThan(req, res);

        sinon.assert.calledOnceWithExactly(res.status, 422);
        sinon.assert.calledOnceWithExactly(
          res.send,
          "Invalid route parameters sent. Only float type are allowed",
        );
      });
    });

    describe("when long parameter is invalid", () => {
      it("returns 422 error", async () => {
        const req = mockRequest({ params: { lat: 3, long: "invalid" } });
        const res = mockResponse();

        await controller.isAnchorageColderThan(req, res);

        sinon.assert.calledOnceWithExactly(res.status, 422);
        sinon.assert.calledOnceWithExactly(
          res.send,
          "Invalid route parameters sent. Only float type are allowed",
        );
      });
    });
  });
});
