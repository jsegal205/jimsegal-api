import axios from "axios";
import { adminUrlBase, adminUrlQueryParams } from "../utils/constants.js";

const getAll = async (req, res) => {
  try {
    await axios
      .get(`${adminUrlBase}/games?${adminUrlQueryParams}&sort=name`)
      .then(({ data }) => {
        res.json(
          data.data.map((game) => ({
            title: game.attributes.name,
            link: game.attributes.url,
            image: game.attributes.image_url,
          }))
        );
      })
      .catch(({ message, name }) => {
        res.json({ message, name });
      });
  } catch (error) {
    throw error;
  }
};

export { getAll };
