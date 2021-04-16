const assert = require("assert");

const { adminUrlBase } = require("../../utils/constants");

describe("Constants.adminUrlBase", () => {
  it("should return https://admin.jimsegal.com", () => {
    assert.strictEqual(adminUrlBase, "https://admin.jimsegal.com");
  });
});
