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
      assert.deepEqual(actual, {});
    });
  });
  describe("when object has REQUIRED_FIELDS prop", () => {
    it("should return object without it", () => {
      const actual = removeInternalProps(new HasRequired());
      assert.deepEqual(actual, { title: "hasRequired" });
    });
  });

  describe("when object does not have REQUIRED_FIELDS prop", () => {
    it("should return object without it", () => {
      const actual = removeInternalProps(new NormalClass());
      assert.deepEqual(actual, { title: "normal" });
    });
  });
});
