const axios = require("axios");

const getAll = async (req, res) => {
  try {
    const apiResponse = await axios
      .get(
        "https://data.heroku.com/dataclips/donygkplrgieljfwbfisudzjmirb.json"
      )
      .catch(error => {
        throw error;
      });

    res.json(
      apiResponse.data.values.map(game => {
        return { title: game[0], link: game[1], image: game[2] };
      })
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getAll
};
