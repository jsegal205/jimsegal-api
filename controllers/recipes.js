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
    const slugRE = new RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "i");
    if (slugRE.test(slug)) {
      const sanatizedSlug = encodeURIComponent(slug.toLowerCase().trim());
      const url = `${adminUrlBase}/recipes/${sanatizedSlug}?${adminUrlQueryParams}`;

      await axios
        .get(url)
        .then(({ data }) => res.json(data.data.attributes))
        .catch(({ message, name }) => {
          res.json({ message, name });
        });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  getBySlug,
};
