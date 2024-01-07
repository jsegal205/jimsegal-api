import sinon from "sinon";

import mock from "../mocks/mock-instance.js";

import * as controller from "../../controllers/games.js";

import { mockRequest, mockResponse } from "./helpers/index.js";
import { adminUrlBase, adminUrlQueryParams } from "../../utils/constants.js";

describe("GamesController", () => {
  after(() => {
    mock.resetHandlers();
  });

  describe("getAll", () => {
    const apiUrl = `${adminUrlBase}/games?${adminUrlQueryParams}&sort=name`;

    describe("when external request is successful", () => {
      it("should return data", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const apiReturn = {
          data: [
            {
              id: 1,
              attributes: {
                name: "name",
                url: "url",
                image_url: "image_url",
              },
            },
          ],
        };

        const mappedReturn = [
          {
            title: apiReturn.data[0].attributes.name,
            link: apiReturn.data[0].attributes.url,
            image: apiReturn.data[0].attributes.image_url,
          },
        ];

        mock.onGet(apiUrl).reply(200, apiReturn);

        await controller.getAll(req, res);

        sinon.assert.calledOnceWithExactly(res.json, mappedReturn);
      });
    });

    describe("when external request fails", () => {
      it("returns error json", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const apiError = {
          message: "Request failed with status code 500",
          name: "Error",
        };

        mock.onGet(apiUrl).reply(500, apiError);

        await controller.getAll(req, res);

        sinon.assert.calledOnceWithExactly(res.json, apiError);
      });
    });
  });
});
