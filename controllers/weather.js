const axios = require("axios");

const getTemp = async (lat, long) => {
  const API_URL =
    "https://api.openweathermap.org/data/2.5/weather?appid=9bf0ee26559265f94c44015dbce8177d&units=imperial";
  const res = await axios.get(`${API_URL}&lat=${lat}&lon=${long}`);

  return {
    lat,
    long,
    temperature: res.data.main.temp,
    units: "imperial"
  };
};

const getAnchorageTemp = async () => {
  return await getTemp("61.2175", "-149.8584");
};

const isAnchorageColderThan = async (lat, long) => {
  try {
    const anchorageDetails = await getAnchorageTemp();
    const compareDetails = await getTemp(lat, long);

    return {
      isAnchorageColder:
        anchorageDetails.temperature < compareDetails.temperature,
      anchorageDetails,
      compareDetails
    };
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

module.exports = {
  isAnchorageColderThan
};
