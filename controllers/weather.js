import axios from "axios";

import * as Location from "./location.js";

const getTemp = async (lat, long) => {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHERMAP_API_KEY}&units=imperial`;
  const temperatureResponse = await axios
    .get(`${API_URL}&lat=${lat}&lon=${long}`)
    .catch((error) => {
      throw error;
    });

  const { city, state } = await Location.getBy(lat, long);

  return {
    city,
    lat,
    long,
    state,
    temperature: temperatureResponse.data.main.temp,
    units: "imperial",
  };
};

const getDailyMaxTemp = async (lat, long) => {
  const API_URL = `https://api.openweathermap.org/data/2.5/forecast/daily?appid=${process.env.OPENWEATHERMAP_API_KEY}&units=imperial&cnt=1`;
  const temperatureResponse = await axios
    .get(`${API_URL}&lat=${lat}&lon=${long}`)
    .catch((error) => {
      throw error;
    });

  const { city, state } = await Location.getBy(lat, long);

  return {
    city,
    lat,
    long,
    state,
    maxTemperature: temperatureResponse.data.list[0].temp.max,
    units: "imperial",
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
      compareDetails,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { getTemp, getDailyMaxTemp, isAnchorageColderThan };
