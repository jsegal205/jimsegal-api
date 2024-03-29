import sinon from "sinon";
import mock from "../mocks/mock-instance.js";

import * as controller from "../../controllers/travel.js";

import { mockRequest, mockResponse } from "./helpers/index.js";
import { adminUrlBase, adminUrlQueryParams } from "../../utils/constants.js";

describe("TravelController", () => {
  after(() => {
    mock.resetHandlers();
  });
  const apiUrl = `${adminUrlBase}/destinations?${adminUrlQueryParams}&sort[0]=city&sort[1]=state`;

  describe("getAll", () => {
    describe("when external request is successful", () => {
      it("should map and return data", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const apiReturn = {
          data: [
            {
              id: 1,
              attributes: {
                city: "City1",
                state: "State1",
                country: "Country1",
                latitude: 1,
                longitude: 2,
                destination_visits: {
                  data: [
                    {
                      id: 1,
                      attributes: {
                        visit_date: "2001-01-01",
                      },
                    },
                    {
                      id: 2,
                      attributes: {
                        visit_date: "2002-02-02",
                      },
                    },
                  ],
                },
              },
            },
            {
              id: 2,
              attributes: {
                city: "City2",
                state: "State2",
                country: "Country2",
                latitude: 3,
                longitude: 4,
                destination_visits: {
                  data: [
                    {
                      id: 3,
                      attributes: {
                        visit_date: "2003-03-03",
                      },
                    },
                    {
                      id: 4,
                      attributes: {
                        visit_date: "2004-04-04",
                      },
                    },
                  ],
                },
              },
            },
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
