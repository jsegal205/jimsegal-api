const axios = require("axios");

const getAll = async () => {
  try {
    const res = await axios.get(
      "https://data.heroku.com/dataclips/donygkplrgieljfwbfisudzjmirb.json"
    );

    return res.data.values.map(game => {
      return { title: game[0], link: game[1], image: game[2] };
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAll
};
