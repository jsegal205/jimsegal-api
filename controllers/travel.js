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

const frequented = async () => {
  const destinations = await getAll();

  return destinations
    .filter(d => d.visits.length > 1)
    .sort((curr, next) => {
      if (
        curr.visits.length < next.visits.length ||
        (curr.visits.length == next.visits.length && curr.city > next.city)
      ) {
        return 1;
      }
      if (
        curr.visits.length > next.visits.length ||
        (curr.visits.length == next.visits.length && curr.city < next.city)
      ) {
        return -1;
      }

      return 0;
    })
    .map(dest => {
      return {
        city: dest.city,
        state: dest.state,
        country: dest.country,
        visitCount: dest.visits.length
      };
    });
};

module.exports = {
  getAll,
  frequented
};
