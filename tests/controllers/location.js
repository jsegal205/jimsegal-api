import { expect } from "chai";

import * as controller from "../../controllers/location.js";
import mock from "../mocks/mock-instance.js";

describe("LocationController", () => {
  after(() => {
    mock.resetHandlers();
  });

  describe("getBy", () => {
    const apiUrl = "https://www.mapquestapi.com/geocoding/v1/reverse";

    describe("when external request is successful", () => {
      it("should return data", async () => {
        const lat = 1;
        const long = 2;

        process.env.MAPQUEST_API_KEY = "fake_key";

        const apiReturn = {
          results: [
            {
              locations: [{ adminArea5: "12", adminArea3: "23" }],
            },
          ],
        };

        const mappedReturn = {
          city: "12",
          state: "23",
        };

        mock
          .onGet(`${apiUrl}?key=fake_key&location=${lat},${long}`)
          .reply(200, apiReturn);

        const actualReturn = await controller.getBy(lat, long);

        expect(actualReturn).to.deep.equal(mappedReturn);
      });
    });

    describe("when following external request fails", () => {
      it("returns error", async () => {
        process.env.MAPQUEST_API_KEY = "fake_key";

        const apiError = {
          message: "Request failed with status code 500",
          name: "Error",
        };
        mock.onGet(apiUrl).reply(500, apiError);

        expect(await controller.getBy("1", "2")).to.throw;
      });
    });
  });
});
