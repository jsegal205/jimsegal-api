const axios = require("axios");
const { adminUrlBase } = require("../utils/constants");

const getAll = async (req, res) => {
  try {
    await axios
      .get(`${adminUrlBase}/recipes`)
      .then(({ data }) => res.json(data))
      .catch(({ message, name }) => {
        res.json({ message, name });
      });
  } catch (error) {
    throw error;
  }
};

const getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    await axios
      .get(`${adminUrlBase}/recipes/${slug}`)
      .then(({ data }) => res.json(data))
      .catch(({ message, name }) => {
        res.json({ message, name });
      });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  getBySlug,
};
