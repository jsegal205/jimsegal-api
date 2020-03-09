const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");

const db = require("../../db/pg");
const RecipeRepository = require("../../repos/recipes");

describe("RecipeRepository", () => {
  const stubValue = [
    {
      id: faker.random.uuid(),
      title: faker.lorem.words,
      slug: faker.lorem.slug,
      referenceLink: faker.internet.url,
      ingredients: faker.lorem.paragraphs,
      directions: faker.lorem.paragraphs,
      notes: faker.lorem.paragraphs
    },
    {
      id: faker.random.uuid(),
      title: faker.lorem.words,
      slug: faker.lorem.slug,
      referenceLink: faker.internet.url,
      ingredients: faker.lorem.paragraphs,
      directions: faker.lorem.paragraphs,
      notes: faker.lorem.paragraphs
    },
    {
      id: faker.random.uuid(),
      title: faker.lorem.words,
      slug: faker.lorem.slug,
      referenceLink: faker.internet.url,
      ingredients: faker.lorem.paragraphs,
      directions: faker.lorem.paragraphs,
      notes: faker.lorem.paragraphs
    }
  ];

  describe("getAll", () => {
    it("should retrieve an array of recipes", async () => {
      const stub = sinon.stub(db, "query").returns(stubValue);
      const recipeRepository = new RecipeRepository();

      const recipes = await recipeRepository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(recipes.length).to.equal(stubValue.length);
    });
  });
});
