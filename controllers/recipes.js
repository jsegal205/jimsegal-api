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
        `https://railway-admin.jimsegal.com/api/recipes/${encodeURIComponent(
          slug
        )}?${adminUrlQueryParams}`
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
