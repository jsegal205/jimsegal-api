const axios = require("axios");

const getAll = async (req, res) => {
  try {
    await axios
      .get("https://admin.jimsegal.com/recipes")
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
      .get(`https://admin.jimsegal.com/recipes/${slug}`)
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
