const axios = require("axios");
const { adminUrlBase } = require("../utils/constants");

const getAll = async (req, res) => {
  try {
    await axios
      .get(`${adminUrlBase}/games`)
      .then(({ data }) => {
        res.json(
          data
            .map((game) => ({
              title: game.name,
              link: game.url,
              image: game.image_url,
            }))
            .sort((current, next) => {
              if (current.title == next.title) return 0;
              return current.title > next.title ? 1 : -1;
            })
        );
      })
      .catch(({ message, name }) => {
        res.json({ message, name });
      });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
};
