const repo = require("../repos/recipes");

const getAll = async (req, res) => {
  try {
    res.json(await repo.getAll());
  } catch (error) {
    throw error;
  }
};

const getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const recipe = await repo.getBySlug(slug);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).send("Does not exist");
    }
  } catch (error) {
    throw error;
  }
};

const create = async (req, res) => {
  try {
    const { api_token } = req.headers;

    if (!api_token || api_token !== process.env.AUTH_TOKEN) {
      return res.status(403).json({
        status: 403,
        message: "FORBIDDEN"
      });
    } else {
      const data = req.body;
      console.log(data);
      res.json({ status: 201, message: "did it" });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  getAll,
  getBySlug,
};
