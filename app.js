const express = require("express");
const middlewares = require("./middlewares");

const Docs = require("./controllers/docs");
const Games = require("./controllers/games");
const Travel = require("./controllers/travel");
const Weather = require("./controllers/weather");

const Sentry = require("@sentry/node");
Sentry.init({
  dsn: "https://3725a1a037c348d59e960d3bcaa493d3@sentry.io/2104007"
});

const port = process.env.PORT || 8001;
const app = express();

app.use(middlewares);

app.get("/", Docs.getAll);
app.get("/isAnchorageColderThan/:lat/:long", Weather.isAnchorageColderThan);
app.get("/games", Games.getAll);
app.get("/travel", Travel.getAll);
app.get("/travel/frequented", Travel.frequented);
app.get("/travel/furthest", Travel.furthest);

app.get("/favicon.ico", (req, res) => res.status(204).send(""));
app.get("*", (req, res) => res.status(404).send("Does not exist"));

app.listen(port, () => {
  console.log(`JimSegalAPI listening on port ${port}!`);
});
