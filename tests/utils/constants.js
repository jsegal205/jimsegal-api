import assert from "assert";

import { adminUrlBase } from "../../utils/constants.js";

describe("Constants.adminUrlBase", () => {
  it("should return https://railway-admin.jimsegal.com/api", () => {
    assert.strictEqual(adminUrlBase, "https://railway-admin.jimsegal.com/api");
  });
});
