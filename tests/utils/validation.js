const assert = require("assert");

const { isValid } = require("../../utils/validation");

class HasRequired {
  REQUIRED_FIELDS = ["someField"];
}
class NormalClass {}

describe("Validation.isValid", () => {
  describe("when no class passed", () => {
    it("returns valid and message keys", () => {
      const actual = isValid();
      assert.deepEqual(Object.keys(actual), ["valid", "message"]);
    });
  });

  describe("when class does not have `REQUIRED_FIELDS` defined", () => {
    it("returns valid and message keys", () => {
      const actual = isValid(new NormalClass());
      assert.deepEqual(Object.keys(actual), ["valid", "message"]);
    });
  });

  describe("when class has `REQUIRED_FIELDS` defined", () => {
    it("returns valid and message keys", () => {
      const actual = isValid(new HasRequired());
      assert.deepEqual(Object.keys(actual), ["valid", "message"]);
    });
  });
});
