require("dotenv").config();

const express = require("express");
const Sentry = require("@sentry/node");

const middlewares = require("./middlewares");

// controllers
const Docs = require("./controllers/docs");
const Games = require("./controllers/games");
const Travel = require("./controllers/travel");
const Weather = require("./controllers/weather");

const port = process.env.PORT || 8001;
const app = express();

if (!!process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN
  });
  app.use(Sentry.Handlers.requestHandler());
}

app.use(middlewares);

app.get("/", Docs.getAll);
app.get("/isAnchorageColderThan/:lat/:long", Weather.isAnchorageColderThan);
app.get("/games", Games.getAll);

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
