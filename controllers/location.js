const axios = require("axios");

const getBy = async (lat, long) => {
  try {
    const API_URL = `https://www.mapquestapi.com/geocoding/v1/reverse?key=Y3zmO0lPUXVmIoPrDpMT1H2Nuu18mF5y`;
    const res = await axios(`${API_URL}&location=${lat},${long}`).catch(
      (error) => {
        throw error;
      }
    );

    const { adminArea5: city, adminArea3: state } =
      res.data.results[0].locations[0];

    return {
      city,
      state,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getBy,
};
