const sinon = require("sinon");

const mock = require("../mocks/mock-instance");

const controller = require("../../controllers/recipes");

const { mockRequest, mockResponse } = require("./helpers");
const { adminUrlBase, adminUrlQueryParams } = require("../../utils/constants");

describe("RecipeController", () => {
  after(() => {
    mock.resetHandlers();
  });

  describe("getAll", () => {
    const apiUrl = `${adminUrlBase}/recipes?${adminUrlQueryParams}`;

    describe("when external request is successful", () => {
      it("should return data", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const apiReturn = {
          data: [
            {
              id: 1,
              attributes: {
                title: "title",
                slug: "slug",
                reference_link: "link",
                ingredients: "ingredients",
                directions: "directions",
                notes: "notes",
              },
            },
          ],
        };

        const mappedReturn = apiReturn.data.map((recipe) => recipe.attributes);

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

  describe("getBySlug", () => {
    describe("when external request is successful", () => {
      it("should return data", async () => {
        const slug = "test-slug";
        const apiReturn = {
          data: {
            id: 1,
            attributes: {
              title: "title",
              slug,
              reference_link: "link",
              ingredients: "ingredients",
              directions: "directions",
              notes: "notes",
            },
          },
        };

        mock
          .onGet(`${adminUrlBase}/recipes/${slug}?${adminUrlQueryParams}`)
          .reply(200, apiReturn);

        const req = mockRequest({ params: { slug } });
        const res = mockResponse();

        await controller.getBySlug(req, res);

        sinon.assert.calledOnceWithExactly(res.json, apiReturn.data.attributes);
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
          .onGet(`${adminUrlBase}/recipes/${slug}?${adminUrlQueryParams}`)
          .reply(404, apiError);

        const req = mockRequest({ params: { slug } });
        const res = mockResponse();

        await controller.getBySlug(req, res);

        sinon.assert.calledOnceWithExactly(res.json, apiError);
      });
    });
  });
});
