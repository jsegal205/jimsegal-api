const axios = require("axios");
const xmlConverter = require("xml-js");

const Game = require("../models/games");
const db = require("../db/pg");

const { removeInternalProps } = require("../utils/repo-helper");

const getAll = async () => {
  try {
    const lookupIds = await db.query("SELECT bgg_id from games");
    const BASE_URL = "https://boardgamegeek.com";
    const API_URL = `${BASE_URL}/xmlapi2/thing?id=${lookupIds
      .map((id) => id["bgg_id"])
      .join()}`;
    const apiResponse = await axios.get(API_URL).catch((error) => {
      throw error;
    });

    const resJson = JSON.parse(
      xmlConverter.xml2json(apiResponse.data, { compact: true })
    );
    const { item } = resJson.items;

    const items = item.map((item) => {
      let bggPrimaryName = "";
      if (Array.isArray(item.name)) {
        bggPrimaryName = item.name.find(
          (item_name) => item_name._attributes.type === "primary"
        );
      } else {
        bggPrimaryName = item.name;
      }

      const title = bggPrimaryName._attributes.value;
      const image = item.thumbnail._text;
      const bggId = item._attributes.id;
      const bggType = item._attributes.type;
      const link = `${BASE_URL}/${bggType}/${bggId}`;
      return removeInternalProps(new Game({ title, link, image, bggId }));
    });

    return items.sort((current, next) => {
      if (current.title == next.title) return 0;
      return current.title > next.title ? 1 : -1;
    });
  } catch (err) {
    throw err;
  }
};

module.exports = { getAll };
