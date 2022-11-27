const axios = require("axios");
const { adminUrlBase, adminUrlQueryParams } = require("../utils/constants");

const getAll = async (req, res) => {
  try {
    await axios
      .get(`${adminUrlBase}/recipes?${adminUrlQueryParams}`)
      .then(({ data }) =>
        res.json(data.data.map((recipe) => recipe.attributes))
      )
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
      .get(
        `${adminUrlBase}/recipes/${slug}?populate=%2A&pagination[pageSize]=100`
      )
      .then(({ data }) => res.json(data.data.attributes))
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
