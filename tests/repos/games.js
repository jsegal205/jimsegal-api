const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");

const axios = require("axios");
const xmlConverter = require("xml-js");

const db = require("../../db/pg");
const repo = require("../../repos/games");

describe("GamesRepository", () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("getAll", () => {
    const apiReturn = {
      items: {
        item: [
          {
            _attributes: { id: 1, type: "boardgame" },
            name: { _attributes: { value: "one" } },
            thumbnail: { _text: faker.internet.url() },
          },
          {
            _attributes: { id: 2, type: "boardgame" },
            name: { _attributes: { value: "a" } },
            thumbnail: { _text: faker.internet.url() },
          },
          {
            _attributes: { id: 2, type: "boardgame" },
            name: [
              { _attributes: { value: "z", type: "primary" } },
              { _attributes: { value: "b", type: "secondary" } },
            ],
            thumbnail: { _text: faker.internet.url() },
          },
        ],
      },
    };

    let dbStub;
    let axiosStub;

    beforeEach(() => {
      dbStub = sandbox.stub(db, "query").returns([1, 2, 3]);

      const axiosResponse = { status: 200, statusText: "OK", data: [] };
      axiosStub = sandbox
        .stub(axios, "get")
        .returns(Promise.resolve(axiosResponse));

      sandbox.stub(xmlConverter, "xml2json").returns(JSON.stringify(apiReturn));
    });

    it("should call to db to get lookup data", async () => {
      await repo.getAll();

      expect(dbStub.calledOnce).to.be.true;
    });

    it("should call api to get boardgame data", async () => {
      await repo.getAll();

      expect(axiosStub.calledOnce).to.be.true;
    });

    it("should pull id from primary type", async () => {
      const actual = await repo.getAll();

      expect(actual[2].title).to.eq("z");
    });

    it("should map api response", async () => {
      const actual = await repo.getAll();

      expect(actual.length).to.eq(apiReturn.items.item.length);

      const firstActual = actual.find((game) => game.title === "one");
      const firstExpected = apiReturn.items.item.find(
        (game) => game.name._attributes.value === "one"
      );
      expect(firstActual.title).to.eq(firstExpected.name._attributes.value);

      const firstExpectedBggId = firstExpected._attributes.id;
      expect(firstActual.bggId).to.eq(firstExpectedBggId);

      const firstExpectedLink = `https://boardgamegeek.com/${firstExpected._attributes.type}/${firstExpectedBggId}`;
      expect(firstActual.link).to.eq(firstExpectedLink);
      expect(firstActual.image).to.eq(firstExpected.thumbnail._text);
    });

    it("should sort the responses on title alphabetically", async () => {
      const actual = await repo.getAll();

      expect(actual.length).to.eq(apiReturn.items.item.length);
      expect(actual[0].title).to.eq("a");
      expect(actual[1].title).to.eq("one");
      expect(actual[2].title).to.eq("z");
    });
  });
});
