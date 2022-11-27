const assert = require("assert");

const { adminUrlBase } = require("../../utils/constants");

describe("Constants.adminUrlBase", () => {
  it("should return https://railway-admin.jimsegal.com/api", () => {
    assert.strictEqual(adminUrlBase, "https://railway-admin.jimsegal.com/api");
  });
});
