const axios = require("axios");

// api docs at https://github.com/r-spacex/SpaceX-API

const getNextLaunch = async (req, res) => {
  try {
    const apiRes = await axios
      .get("https://api.spacexdata.com/v4/launches/next")
      .catch((error) => {
        throw error;
      });

    const {
      name,
      date_unix,
      date_utc,
      details,
      rocket,
      launchpad,
    } = apiRes.data;

    const rocketRes = await axios.get(
      `https://api.spacexdata.com/v4/rockets/${rocket}`
    );
    const launchpadRes = await axios.get(
      `https://api.spacexdata.com/v4/launchpads/${launchpad}`
    );

    return res.json({
      mission_name: name,
      date_unix,
      date_utc,
      details,
      rocket_name: rocketRes.data.name,
      launchpad: launchpadRes.data.full_name,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getNextLaunch,
};
