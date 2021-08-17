const sinon = require("sinon");

const mock = require("../mocks/mock-instance");

const controller = require("../../controllers/games");

const { mockRequest, mockResponse } = require("./helpers");

describe("GamesController", () => {
  describe("getAll", () => {
    const apiUrl = "https://admin.jimsegal.com/games";

    describe("when external request is successful", () => {
      it("should return data", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const apiReturn = [
          {
            name: "name",
            url: "url",
            image_url: "image_url",
          },
        ];

        const mappedReturn = [
          {
            title: apiReturn[0].name,
            link: apiReturn[0].url,
            image: apiReturn[0].image_url,
          },
        ];

        mock.onGet(apiUrl).reply(200, apiReturn);

        await controller.getAll(req, res);

        sinon.assert.calledOnceWithExactly(res.json, mappedReturn);
      });

      it("sorts returned data based on name", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const apiReturn = [
          {
            name: "b",
            url: "a",
            image_url: "a",
          },
          {
            name: "a",
            url: "b",
            image_url: "b",
          },
        ];

        const mappedReturn = [
          {
            title: apiReturn[1].name,
            link: apiReturn[1].url,
            image: apiReturn[1].image_url,
          },
          {
            title: apiReturn[0].name,
            link: apiReturn[0].url,
            image: apiReturn[0].image_url,
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
