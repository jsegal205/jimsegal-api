const axios = require("axios");

const Location = require("./location");

const getTemp = async (lat, long) => {
  const API_URL =
    "https://api.openweathermap.org/data/2.5/weather?appid=9bf0ee26559265f94c44015dbce8177d&units=imperial";
  const temperatureResponse = await axios
    .get(`${API_URL}&lat=${lat}&lon=${long}`)
    .catch(error => {
      throw error;
    });

  const { city, state } = await Location.getBy(lat, long);

  return {
    city,
    lat,
    long,
    state,
    temperature: temperatureResponse.data.main.temp,
    units: "imperial"
  };
};

const getAnchorageTemp = async () => {
  return await getTemp("61.2175", "-149.8584");
};

const isAnchorageColderThan = async (req, res) => {
  const { lat, long } = req.params;
  if (!parseFloat(lat) || !parseFloat(long)) {
    res
      .status(422)
      .send("Invalid route parameters sent. Only float type are allowed");
    return;
  }

  try {
    const anchorageDetails = await getAnchorageTemp();
    const compareDetails = await getTemp(lat, long);

    res.json({
      isAnchorageColder:
        anchorageDetails.temperature < compareDetails.temperature,
      anchorageDetails,
      compareDetails
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  isAnchorageColderThan
};
