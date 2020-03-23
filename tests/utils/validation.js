const assert = require("assert");

const { validateRequiredFields } = require("../../utils/validation");

class HasRequired {
  REQUIRED_FIELDS = ["someField"];
}
class NormalClass {}

describe("Validation.validateRequiredFields", () => {
  describe("when no class passed", () => {
    it("returns valid and message keys", () => {
      const actual = validateRequiredFields();
      assert.deepEqual(Object.keys(actual), ["valid", "message"]);
    });
  });

  describe("when class does not have `REQUIRED_FIELDS` defined", () => {
    it("returns valid and message keys", () => {
      const actual = validateRequiredFields(new NormalClass());
      assert.deepEqual(Object.keys(actual), ["valid", "message"]);
    });
  });

  describe("when class has `REQUIRED_FIELDS` defined", () => {
    it("returns valid and message keys", () => {
      const actual = validateRequiredFields(new HasRequired());
      assert.deepEqual(Object.keys(actual), ["valid", "message"]);
    });
  });
});
