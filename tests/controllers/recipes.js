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

      const req = mockRequest({ slug });
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

      const req = mockRequest({ slug });
      const res = mockResponse();

      await controller.getBySlug(req, res);

      expect(repoStub.calledOnce).to.be.true;
      expect(res.status.calledOnceWithExactly(404)).to.be.true;
      expect(res.send.calledOnceWithExactly("Does not exist")).to.be.true;
    });
  });

  describe("create", () => {
    const validParams = {
      title: "title",
      slug: "test-slug",
      reference_link: "link",
      ingredients: "ingredients",
      directions: "directions",
      notes: "notes",
    };
    before(() => {
      process.env.AUTH_TOKEN = "valid";
    });

    describe("when auth token is invalid", () => {
      it("should not call to repo", async () => {
        const repoStub = sandbox.stub(repo, "create").withArgs(validParams);
        const req = mockRequest(validParams, { api_token: "invalid" });
        const res = mockResponse();

        await controller.create(req, res);

        expect(repoStub.calledOnce).to.be.false;
        expect(res.status.calledOnceWithExactly(403)).to.be.true;
        expect(res.send.calledOnceWithExactly("Forbidden")).to.be.true;
      });
    });

    describe("when auth token is valid", () => {
      describe("when data is persisted", () => {
        it("should call to repo", async () => {
          const recipe = new Recipe(validParams);
          const expected = { recipe };
          const repoStub = sandbox
            .stub(repo, "create")
            .returns({ persisted: true, ...expected });

          const req = mockRequest(validParams, { api_token: "valid" });
          const res = mockResponse();
          await controller.create(req, res);

          expect(repoStub.calledOnce).to.be.true;
          expect(res.status.calledOnceWithExactly(201)).to.be.true;
          expect(res.json.calledOnceWithExactly(expected)).to.be.true;
        });
      });

      describe("when data is not persisted", () => {
        it("should call to repo", async () => {
          const expected = { message: "data not persisted" };
          const repoStub = sandbox
            .stub(repo, "create")
            .returns({ persisted: false, ...expected });

          const req = mockRequest(validParams, { api_token: "valid" });
          const res = mockResponse();
          await controller.create(req, res);

          expect(repoStub.calledOnce).to.be.true;
          expect(res.status.calledOnceWithExactly(400)).to.be.true;
          expect(res.json.calledOnceWithExactly(expected)).to.be.true;
        });
      });
    });
  });
});
