import assert from "assert";

import { validateRequiredFields } from "../../utils/validation.js";

class HasRequired {
  REQUIRED_FIELDS = ["someField"];
}
class NormalClass {}

describe("Validation.validateRequiredFields", () => {
  describe("when no class passed", () => {
    it("returns valid and message keys", () => {
      const actual = validateRequiredFields();
      assert.deepStrictEqual(Object.keys(actual), ["valid", "message"]);
    });
  });

  describe("when class does not have `REQUIRED_FIELDS` defined", () => {
    it("returns valid and message keys", () => {
      const actual = validateRequiredFields(new NormalClass());
      assert.deepStrictEqual(Object.keys(actual), ["valid", "message"]);
    });
  });

  describe("when class has `REQUIRED_FIELDS` defined", () => {
    it("returns valid and message keys", () => {
      const actual = validateRequiredFields(new HasRequired());
      assert.deepStrictEqual(Object.keys(actual), ["valid", "message"]);
    });

    describe("when object prop does not have required prop", () => {
      it("returns invalid and message", () => {
        const hasRequired = new HasRequired();
        hasRequired["notRequired"] = "value";

        const actual = validateRequiredFields(hasRequired);
        assert.deepStrictEqual(actual, {
          valid: false,
          message: `${hasRequired.REQUIRED_FIELDS[0]} - fields are required`,
        });
      });
    });

    describe("when object prop has required prop", () => {
      it("returns valid and no message", () => {
        const hasRequired = new HasRequired();
        hasRequired[hasRequired.REQUIRED_FIELDS[0]] = "value";

        const actual = validateRequiredFields(hasRequired);
        assert.deepStrictEqual(actual, { valid: true, message: "" });
      });
    });
  });
});
