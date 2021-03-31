const axios = require("axios");

const getAll = async (req, res) => {
  try {
    const apiRes = await axios
      .get("https://admin.jimsegal.com/recipes")
      .catch((error) => {
        throw error;
      });

    res.json(apiRes.data);
  } catch (error) {
    throw error;
  }
};

const getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const apiRes = await axios
      .get(`https://admin.jimsegal.com/recipes/${slug}`)
      .catch(({ name, message }) => {
        res.json({ name, message });
      });

    res.json(apiRes.data);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  getBySlug,
};
