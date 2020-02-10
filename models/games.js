const axios = require("axios");
const xmlConverter = require("xml-js");
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

const getbgg = async () => {
  try {
    const lookupIds = await db.query("SELECT bgg_id from games");
    const BASE_URL = "https://www.boardgamegeek.com";
    const API_URL = `${BASE_URL}/xmlapi2/thing?id=${lookupIds
      .map(id => id["bgg_id"])
      .join()}`;
    const apiResponse = await axios(API_URL).catch(error => {
      throw error;
    });

    const resJson = JSON.parse(
      xmlConverter.xml2json(apiResponse.data, { compact: true })
    );
    const { item } = resJson.items;

    const items = item.map(item => {
      let bggPrimaryName = "";
      if (Array.isArray(item.name)) {
        bggPrimaryName = item.name.find(
          item_name => item_name._attributes.type === "primary"
        );
      } else {
        bggPrimaryName = item.name;
      }

      const name = bggPrimaryName._attributes.value;
      const thumbnail = item.thumbnail._text;
      const bggId = item._attributes.id;
      const bggType = item._attributes.type;
      const link = `${BASE_URL}/${bggType}/${bggId}`;
      return { bggId, bggType, name, thumbnail, link };
    });

    return items.sort((current, next) => {
      if (current.name == next.name) return 0;
      return current.name < next.name ? 1 : -1;
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { getAll, getbgg };
