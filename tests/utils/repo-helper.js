const assert = require("assert");

const { removeInternalProps } = require("../../utils/repo-helper");

class HasRequired {
  REQUIRED_FIELDS = ["someField"];
  title = "hasRequired";
}
class NormalClass {
  title = "normal";
}

describe("RepoHelper.removeInternalProps", () => {
  describe("when object is empty", () => {
    it("should return empty object", () => {
      const actual = removeInternalProps({});
      assert.deepStrictEqual(actual, {});
    });
  });
  describe("when object has REQUIRED_FIELDS prop", () => {
    it("should return object without it", () => {
      const actual = removeInternalProps(new HasRequired());
      assert.deepStrictEqual(actual, { title: "hasRequired" });
    });
  });

  describe("when object does not have REQUIRED_FIELDS prop", () => {
    it("should return object without it", () => {
      const actual = removeInternalProps(new NormalClass());
      assert.deepStrictEqual(actual, { title: "normal" });
    });
  });
});
