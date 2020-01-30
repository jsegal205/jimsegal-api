const express = require("express");
const cors = require("cors");
const sslRedirect = require("./modules/ssl-redirect");

const Games = require("./controllers/games");
const Travel = require("./controllers/travel");
const Weather = require("./controllers/weather");

const Sentry = require("@sentry/node");
Sentry.init({
  dsn: "https://3725a1a037c348d59e960d3bcaa493d3@sentry.io/2104007"
});

const port = process.env.PORT || 8001;
const app = express();

const allowedOrigins = [
  "http://localhost:8000",
  "https://jimsegal.com",
  "https://www.jimsegal.com"
];
app.use([
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin,
      // ie going directly to api.jimsegal.com or using curl
      if (!origin) {
        return callback(null, true);
      }

      if (!allowedOrigins.includes(origin)) {
        return callback(
          new Error(
            "The CORS policy for this site does not allow access from the specified Origin."
          ),
          false
        );
      }
      return callback(null, true);
    }
  }),
  sslRedirect()
]);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/docs/index.html");
});

app.get("/favicon.ico", (req, res) => res.status(204).send(""));

app.get("/isAnchorageColderThan/:lat/:long", async (req, res) => {
  const { lat, long } = req.params;
  const compareAnchorage = await Weather.isAnchorageColderThan(lat, long);

  res.send(compareAnchorage);
});

app.get("/games", async (req, res) => {
  const games = await Games.getAll();

  res.send(games);
});

app.get("/travel", async (req, res) => {
  const travel = await Travel.getAll();

  res.send(travel);
});

app.get("/travel/frequented", async (req, res) => {
  const travel = await Travel.frequented();

  res.send(travel);
});

app.get("/travel/furthest", async (req, res) => {
  const travel = await Travel.furthest();

  res.send(travel);
});

app.get("*", (req, res) => res.status(404).send("Does not exist"));

app.listen(port, () => {
  console.log(`JimSegalAPI listening on port ${port}!`);
});
