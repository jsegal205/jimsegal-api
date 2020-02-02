const express = require("express");
const cors = require("cors");
const sslRedirect = require("./modules/ssl-redirect");

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
