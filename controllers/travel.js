const axios = require("axios");

const getAll = async () => {
  try {
    const res = await axios.get(
      "https://data.heroku.com/dataclips/zufupjioefakciimcrrnbzhbcwau.json"
    );

    return res.data.values.map(travel => {
      return {
        city: travel[0],
        state: travel[1],
        country: travel[2],
        lat: travel[3],
        lng: travel[4],
        visits: travel[5]
      };
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAll
};
