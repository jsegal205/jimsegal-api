const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const Recipe = require("../../models/recipes");
const repo = require("../../repos/recipes");
const controller = require("../../controllers/recipes");

const { mockRequest, mockResponse } = require("./helpers");

describe("RecipeController", () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("getAll", () => {
    it("should call to repo", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const stub = sandbox.stub(repo, "getAll");

      await controller.getAll(req, res);

      expect(stub.calledOnce).to.be.true;
    });
  });

  describe("getBySlug", () => {
    it("should call to repo", async () => {
      const slug = "test-slug";
      const repoReturn = new Recipe({
        title: "title",
        slug,
        reference_link: "link",
        ingredients: "ingredients",
        directions: "directions",
        notes: "notes",
      });
      const repoStub = sandbox
        .stub(repo, "getBySlug")
        .withArgs(slug)
        .returns(repoReturn);

      const req = mockRequest(slug);
      const res = mockResponse();
      await controller.getBySlug(req, res);

      expect(repoStub.calledOnce).to.be.true;
      expect(res.json.calledOnceWithExactly(repoReturn)).to.be.true;
    });

    it("returns 404 status when nothing found", async () => {
      const slug = "test-slug";

      const repoStub = sandbox
        .stub(repo, "getBySlug")
        .withArgs(slug)
        .returns(null);

      const req = mockRequest(slug);
      const res = mockResponse();

      await controller.getBySlug(req, res);

      expect(repoStub.calledOnce).to.be.true;
      expect(res.status.calledOnceWithExactly(404)).to.be.true;
      expect(res.send.calledOnceWithExactly("Does not exist")).to.be.true;
    });
  });
});
