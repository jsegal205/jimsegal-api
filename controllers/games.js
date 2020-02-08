const axios = require("axios");
const xmlConverter = require("xml-js");
const Games = require("../models/games");

const getAll = async (req, res) => {
  try {
    res.json(await Games.getAll());
  } catch (error) {
    throw error;
  }
};

const getbgg = async (req, res) => {
  try {
    const lookupIds = "167791,207830"; // maybe store in db.
    const BASE_URL = "https://www.boardgamegeek.com";
    const API_URL = `${BASE_URL}/xmlapi2/thing?id=${lookupIds}`;
    const apiResponse = await axios(API_URL).catch(error => {
      throw error;
    });

    const resJson = JSON.parse(
      xmlConverter.xml2json(apiResponse.data, { compact: true })
    );
    const { item } = resJson.items;
    const items = item.map(item => {
      let bggPrimaryName = "";

      debugger;
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

    res.json(
      items.sort((current, next) => {
        if (current.name == next.name) return 0;
        return current.name < next.name ? 1 : -1;
      })
    );

    // res.json(items);
    //     resJson.items.item.name[0]._attributes
    // { type: 'primary',
    //   sortindex: '1',
    //   value: 'Terraforming Mars' }

    // Object.keys(resJson.items.item)
    // [ '_attributes',
    //   'thumbnail',
    //   'image',
    //   'name',
    //   'description',
    //   'yearpublished',
    //   'minplayers',
    //   'maxplayers',
    //   'poll',
    //   'playingtime',
    //   'minplaytime',
    //   'maxplaytime',
    //   'minage',
    //   'link' ]

    // return {
    //   city,
    //   state
    // };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getAll,
  getbgg
};
