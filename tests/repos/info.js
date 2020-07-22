const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const axios = require("axios");
const repo = require("../../repos/info");

describe("InfoRepository", () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("getGithub", () => {
    const apiReturn = [
      {
        type: "PushEvent",
        repo: {
          name: "jsegal205/jimsegal-projects",
        },
        payload: {
          ref: "ref/head/main",
          commits: [
            {
              sha: "95279183471f5b1017e907d6543aaa944ac0f171",
              message: "message one",
            },
            {
              sha: "4df7678cd4c0127336a29ee5310d366fe697937c",
              message: "message two",
            },
          ],
        },
        created_at: "2020-06-28T17:27:50Z",
      },
    ];

    let axiosStub;

    beforeEach(() => {
      const axiosResponse = { status: 200, statusText: "OK", data: apiReturn };
      axiosStub = sandbox
        .stub(axios, "get")
        .returns(Promise.resolve(axiosResponse));
    });

    it("should call api to get github data", async () => {
      await repo.getGithub();

      expect(axiosStub.calledOnce).to.be.true;
    });

    it("should map api response", async () => {
      const actual = await repo.getGithub();

      expect(actual.length).to.eq(apiReturn.length);

      const firstActual = actual[0];
      const firstApiReturn = apiReturn[0];
      expect(Object.keys(firstActual)).to.have.members([
        "repoName",
        "commits",
        "createdAt",
      ]);
      expect(firstActual.repoName).to.eq(firstApiReturn.repo.name);
      expect(firstActual.commits).to.have.deep.members(
        firstApiReturn.payload.commits
      );
      expect(firstActual.createdAt).to.eq(firstApiReturn.created_at);
    });
  });

  describe("when different github types returned", () => {
    const apiReturn = [
      {
        type: "somethingElse",
        repo: {
          name: "jsegal205/jimsegal-projects",
        },
        payload: {
          ref: "ref/head/main",
          commits: [],
        },
        created_at: "2020-12-31T12:00:00Z",
      },
      {
        type: "PushEvent",
        repo: {
          name: "jsegal205/jimsegal-projects",
        },
        payload: {
          ref: "ref/head/main",
          commits: [],
        },
        created_at: "2020-01-01T12:00:00Z",
      },
    ];

    beforeEach(() => {
      const axiosResponse = { status: 200, statusText: "OK", data: apiReturn };
      axiosStub = sandbox
        .stub(axios, "get")
        .returns(Promise.resolve(axiosResponse));
    });

    it("only returns events of type `PushEvent`", async () => {
      const actual = await repo.getGithub();

      expect(actual.length).to.not.eq(apiReturn.length);
      expect(actual.length).to.eq(1);
      expect(actual[0].createdAt).to.eq("2020-01-01T12:00:00Z");
    });
  });

  describe("when multiple `PushEvent` events returned", () => {
    const apiReturn = [
      {
        type: "PushEvent",
        repo: {
          name: "jsegal205/jimsegal-projects",
        },
        payload: {
          ref: "refs/heads/gh-pages",
          commits: [],
        },
        created_at: "2020-12-31T12:00:00Z",
      },
      {
        type: "PushEvent",
        repo: {
          name: "jsegal205/jimsegal-projects",
        },
        payload: {
          ref: "ref/heads/main",
          commits: [],
        },
        created_at: "2020-01-01T12:00:00Z",
      },
    ];

    beforeEach(() => {
      const axiosResponse = { status: 200, statusText: "OK", data: apiReturn };
      axiosStub = sandbox
        .stub(axios, "get")
        .returns(Promise.resolve(axiosResponse));
    });

    it("filters any branch `ref` of `gh-pages`", async () => {
      const actual = await repo.getGithub();

      expect(actual.length).to.not.eq(apiReturn.length);
      expect(actual.length).to.eq(1);
      expect(actual[0].createdAt).to.eq("2020-01-01T12:00:00Z");
    });
  });
});
