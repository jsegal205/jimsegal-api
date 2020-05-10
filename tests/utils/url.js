const assert = require("assert");

const { slugify } = require("../../utils/url");

describe("Url.slugify", () => {
  it("should downcase entire string", () => {
    const actual = slugify("SHOULDBELOWER");
    assert.equal(actual, "shouldbelower");
  });

  it("should replace spaces with hypens", () => {
    const actual = slugify("one two");
    assert.equal(actual, "one-two");
  });

  it("should replace multiple spaces with single hypen", () => {
    const actual = slugify("one    two");
    assert.equal(actual, "one-two");
  });

  it("should replace multiple hyphen with single hypen", () => {
    const actual = slugify("one---two");
    assert.equal(actual, "one-two");
  });

  it("should replace invalid url characters", () => {
    const actual = slugify(
      "abcdefghijklmnopqrstuvwxyz !@#$%^&*()_-+=<>,./?;:'\"[]{}\\|`~ 1234567890"
    );
    assert.equal(actual, "abcdefghijklmnopqrstuvwxyz-1234567890");
  });

  it("should handle empty inputs", () => {
    const actual = slugify("");
    assert.equal(actual, "");
  });
});
