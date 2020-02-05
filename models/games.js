const db = require("../db/pg");

const getAllGames = async () => {
  const client = await db.pool.connect();
  try {
    const result = await client.query("SELECT * FROM games ORDER BY name ASC");

    return result.rows.map(game => {
      return { title: game.name, link: game.url, image: game.image_url };
    });
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { getAllGames };
