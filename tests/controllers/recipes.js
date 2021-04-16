const chai = require("chai");
const expect = chai.expect;

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

const controller = require("../../controllers/recipes");

const { mockRequest, mockResponse } = require("./helpers");

describe("RecipeController", () => {
  const mock = new MockAdapter(axios);

  describe("getAll", () => {
    const apiUrl = "https://admin.jimsegal.com/recipes";

    describe("when external request is successful", () => {
      it("should return data", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const apiReturn = {
          data: [
            {
              title: "title",
              slug: "slug",
              reference_link: "link",
              ingredients: "ingredients",
              directions: "directions",
              notes: "notes",
            },
          ],
        };

        mock.onGet(apiUrl).reply(200, apiReturn);

        await controller.getAll(req, res);

        expect(res.json.calledOnceWithExactly(apiReturn)).to.be.true;
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

        expect(res.json.calledOnceWithExactly(apiError)).to.be.true;
      });
    });
  });

  describe("getBySlug", () => {
    describe("when external request is successful", () => {
      it("should return data", async () => {
        const slug = "test-slug";
        const apiReturn = {
          data: {
            title: "title",
            slug,
            reference_link: "link",
            ingredients: "ingredients",
            directions: "directions",
            notes: "notes",
          },
        };

        mock
          .onGet(`https://admin.jimsegal.com/recipes/${slug}`)
          .reply(200, apiReturn);

        const req = mockRequest({ params: { slug } });
        const res = mockResponse();

        await controller.getBySlug(req, res);

        expect(res.json.calledOnceWithExactly(apiReturn)).to.be.true;
      });
    });

    describe("when external request fails", () => {
      it("returns error json", async () => {
        const slug = "test-slug";
        const apiError = {
          message: "Request failed with status code 404",
          name: "Error",
        };

        mock
          .onGet(`https://admin.jimsegal.com/recipes/${slug}`)
          .reply(404, apiError);

        const req = mockRequest({ params: { slug } });
        const res = mockResponse();

        await controller.getBySlug(req, res);

        expect(res.json.calledOnceWithExactly(apiError)).to.be.true;
      });
    });
  });
});
