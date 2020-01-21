const express = require("express");

const port = process.env.PORT || 8001;
const app = express();

app.get("/", (req, res) => {
  res.send(JSON.stringify({ Jim: "Segal" }));
});

app.get("/favicon.ico", (req, res) => res.status(204));

app.get("*", (req, res) => res.send("Does not exist"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
