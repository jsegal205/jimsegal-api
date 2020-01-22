const express = require("express");
const cors = require("cors");

const Games = require("./games");

const port = process.env.PORT || 8001;
const app = express();

const allowedOrigins = [
  "http://localhost:8000",
  "http://api.jimsegal.com",
  "https://jimsegal.com",
  "https://www.jimsegal.com"
];
app.use(
  cors({
    origin: (origin, callback) => {
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
  })
);

app.get("/", (req, res) => {
  res.send(JSON.stringify({ Jim: "Segal" }));
});

app.get("/favicon.ico", (req, res) => res.status(204).send(""));

app.get("/games", async (req, res) => {
  const games = await Games.getAll();

  res.send(games);
});

app.get("*", (req, res) => res.status(404).send("Does not exist"));

app.listen(port, () => {
  console.log(`JimSegalAPI listening on port ${port}!`);
});
