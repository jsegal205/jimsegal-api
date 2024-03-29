import axios from "axios";

const getBy = async (lat, long) => {
  try {
    const API_URL = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.MAPQUEST_API_KEY}`;
    const res = await axios(`${API_URL}&location=${lat},${long}`).catch(
      (error) => {
        throw error;
      },
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

export { getBy };
