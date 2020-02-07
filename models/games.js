const db = require("../db/pg");

class Game {
  constructor(title, link, image) {
    this.title = title || "";
    this.link = link || "";
    this.image = image || "";
  }

  isValid = () => [this.title, this.link, this.image].every(param => !!param);
}

const getAll = async () => {
  const results = await db.query("SELECT * FROM games ORDER BY name ASC");
  return results.map(result => {
    return new Game(result.name, result.url, result.image_url);
  });
};

module.exports = { getAll };
