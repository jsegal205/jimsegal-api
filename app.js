const express = require("express");
const Games = require("./games");

const port = process.env.PORT || 8001;
const app = express();

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
