import { config } from "dotenv";

config()

import * as express from "express";

import Sentry from "@sentry/node"

import middlewares from "./middlewares";

// controllers
import Congress from "./controllers/congress"
import Docs from "./controllers/docs"
import Games from "./controllers/games"
import Health from './controllers/health'
import Recipes from "./controllers/recipes"
import Travel from "./controllers/travel"
import Weather from "./controllers/weather"
import Shorts from "./controllers/shorts"
import Spacex from "./controllers/spacex"

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
app.get("/spacex/next", Spacex.getNextLaunch);
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
