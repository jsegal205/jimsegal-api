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
    throw new Error(err);
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

const furthest = async () => {
  const destinations = await getAll();

  // algorithm taken from https://stackoverflow.com/a/27943/282110
  const deg2rad = deg => deg * (Math.PI / 180);

  const getDistance = ({ lat, lng }) => {
    const chicago = {
      lat: 41.878114,
      lng: -87.629798
    };

    const dLat = deg2rad(lat - chicago.lat);
    const dLon = deg2rad(lng - chicago.lng);
    const hav =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(chicago.lat)) *
        Math.cos(deg2rad(lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const angleRadians = 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav));
    return 3961 * angleRadians; // 3961 is the radius of the earth in miles
  };

  return destinations
    .map(dest => {
      return {
        ...dest,
        distance: getDistance(dest)
      };
    })
    .reduce((curr, next) => (curr.distance > next.distance ? curr : next));
};

module.exports = {
  getAll,
  frequented,
  furthest
};
