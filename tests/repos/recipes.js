const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const db = require("../../db/pg");
const repo = require("../../repos/recipes");

describe("RecipeRepository", () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("getAll", () => {
    it("should call to db to get data", async () => {
      const dbStub = sandbox.stub(db, "query").returns([]);

      await repo.getAll();

      expect(dbStub.calledOnce).to.be.true;
    });

    describe("when db returns results", () => {
      it("should return all results", async () => {
        const dbReturn = [
          {
            title: "title",
            slug: "slug",
            reference_link: "reference_link",
            ingredients: "ingredients",
            directions: "directions",
            notes: "notes",
          },
          {
            title: "title2",
            slug: "slug2",
            reference_link: "reference_link2",
            ingredients: "ingredients2",
            directions: "directions2",
            notes: "notes2",
          },
        ];
        sandbox.stub(db, "query").returns(dbReturn);

        const actual = await repo.getAll();

        expect(actual.length).to.eq(dbReturn.length);
      });
    });
  });

  describe("getBySlug", () => {
    it("should call to db to get data", async () => {
      const dbStub = sandbox.stub(db, "query").returns([]);

      await repo.getBySlug("slug");

      expect(dbStub.calledOnce).to.be.true;
    });

    describe("when db returns no results", () => {
      it("returns null", async () => {
        sandbox.stub(db, "query").returns([]);

        const actual = await repo.getBySlug("slug");

        expect(actual).to.be.null;
      });
    });

    describe("when db returns multiple results", () => {
      it("returns the first result", async () => {
        const dbReturn = [
          {
            title: "title",
            slug: "slug",
            reference_link: "reference_link",
            ingredients: "ingredients",
            directions: "directions",
            notes: "notes",
          },
          {
            title: "title2",
            slug: "slug2",
            reference_link: "reference_link2",
            ingredients: "ingredients2",
            directions: "directions2",
            notes: "notes2",
          },
        ];
        sandbox.stub(db, "query").returns(dbReturn);

        const actual = await repo.getBySlug("slug");

        const expected = dbReturn[0];
        expect(actual.title).to.eq(expected.title);
        expect(actual.slug).to.eq(expected.slug);
        expect(actual.referenceLink).to.eq(expected.reference_link);
        expect(actual.ingredients).to.eq(expected.ingredients);
        expect(actual.directions).to.eq(expected.directions);
        expect(actual.notes).to.eq(expected.notes);
      });
    });
  });
});
