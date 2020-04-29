require("dotenv").config();
const assert = require("assert");

const db = require("../../db/pg");

describe("database", () => {
  describe("query()", () => {
    describe("when no query supplied", () => {
      it("throws error", async () => {
        await assert.rejects(db.query, {
          name: "ReferenceError",
          message: "No query provided",
        });
      });
    });

    describe("when no pool set up", () => {
      before(() => {
        process.env.HOST = undefined;
      });

      it("throws error", async () => {
        await assert.rejects(
          async () => {
            await db.query(`SELECT * FROM "games"`);
          },
          {
            name: "ReferenceError",
            message: "Pool connection not set up",
          }
        );
      });
    });

    xdescribe("HAPPY PATH", () => {
      before(() => {
        process.env.HOST = "development";
      });
      it("does not error", async () => {
        await assert.doesNotReject(async () => {
          await db.query(`SELECT * FROM "games"`);
        });
      });
    });
  });
});
