const db = require("../db/pg");

const getAllGames = async () => {
  const results = await db.query("SELECT * FROM games ORDER BY name ASC");

  return results.map(game => {
    return { title: game.name, link: game.url, image: game.image_url };
  });
};

module.exports = { getAllGames };
