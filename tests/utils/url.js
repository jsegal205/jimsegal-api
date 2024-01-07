import assert from "assert";

import { slugify } from "../../utils/url.js";

describe("Url.slugify", () => {
  it("should downcase entire string", () => {
    const actual = slugify("SHOULDBELOWER");
    assert.strictEqual(actual, "shouldbelower");
  });

  it("should replace spaces with hypens", () => {
    const actual = slugify("one two");
    assert.strictEqual(actual, "one-two");
  });

  it("should replace multiple spaces with single hypen", () => {
    const actual = slugify("one    two");
    assert.strictEqual(actual, "one-two");
  });

  it("should replace multiple hyphen with single hypen", () => {
    const actual = slugify("one---two");
    assert.strictEqual(actual, "one-two");
  });

  it("should replace invalid url characters", () => {
    const actual = slugify(
      "abcdefghijklmnopqrstuvwxyz !@#$%^&*()_-+=<>,./?;:'\"[]{}\\|`~ 1234567890",
    );
    assert.strictEqual(actual, "abcdefghijklmnopqrstuvwxyz-1234567890");
  });

  it("should handle empty inputs", () => {
    const actual = slugify("");
    assert.strictEqual(actual, "");
  });
});
