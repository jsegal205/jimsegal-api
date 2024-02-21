import { config } from "dotenv";

config();

import express from "express";

import Sentry from "@sentry/node";

import middlewares from "./middlewares/index.js";

// controllers
import * as Congress from "./controllers/congress.js";
import * as Docs from "./controllers/docs.js";
import * as Games from "./controllers/games.js";
import * as Health from "./controllers/health.js";
import * as Recipes from "./controllers/recipes.js";
import * as Travel from "./controllers/travel.js";
import * as Weather from "./controllers/weather.js";
import * as Shorts from "./controllers/shorts.js";

const port = process.env.PORT || 8001;
const app = express();

//https://github.com/expressjs/express/pull/2813#issuecomment-159270428
app.disable("x-powered-by");

if (!!process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });
  app.use(Sentry.Handlers.requestHandler());
}

app.use(middlewares);

app.get("/", Docs.getAll);
app.get("/congress/stats", Congress.getStats);
app.get("/congress/:chamber/members", Congress.getMembers);
app.get("/congress/:chamber/member/:id", Congress.getMember);
app.get("/isAnchorageColderThan/:lat/:long", Weather.isAnchorageColderThan);
app.get("/games", Games.getAll);
app.get("/health", Health.get);
app.get("/recipes", Recipes.getAll);
app.get("/recipe/:slug", Recipes.getBySlug);
app.get("/shorts", Shorts.wearingProbability);
app.get("/travel", Travel.getAll);
app.get("/travel/frequented", Travel.frequented);
app.get("/travel/furthest", Travel.furthest);
app.get("/favicon.ico", (req, res) => res.status(204).send(""));
app.get("*", (req, res) => res.status(404).send("Does not exist"));

if (!!process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

app.listen(port, () => {
  console.log(`JimSegalAPI listening on port ${port}!`);
});
