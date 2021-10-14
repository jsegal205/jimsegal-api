const sinon = require("sinon");
const mock = require("../mocks/mock-instance");

const controller = require("../../controllers/travel");

const { mockRequest, mockResponse } = require("./helpers");

describe("TravelController", () => {
  after(() => {
    mock.resetHandlers();
  });

  const apiUrl = "https://admin.jimsegal.com/destinations";

  describe("getAll", () => {
    describe("when external request is successful", () => {
      it("should map and return data", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const apiReturn = [
          {
            city: "City1",
            state: "State1",
            country: "Country1",
            latitude: 1,
            longitude: 2,
            destination_visits: [
              { visit_date: "2001-01-01" },
              { visit_date: "2002-02-02" },
            ],
          },
          {
            city: "City2",
            state: "State2",
            country: "Country2",
            latitude: 3,
            longitude: 4,
            destination_visits: [
              { visit_date: "2003-03-03" },
              { visit_date: "2004-04-04" },
            ],
          },
        ];

        mock.onGet(apiUrl).reply(200, apiReturn);

        const mappedReturn = [
          {
            city: "City1",
            state: "State1",
            country: "Country1",
            lat: 1,
            lng: 2,
            visits: ["February 2002", "January 2001"],
          },
          {
            city: "City2",
            state: "State2",
            country: "Country2",
            lat: 3,
            lng: 4,
            visits: ["April 2004", "March 2003"],
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
