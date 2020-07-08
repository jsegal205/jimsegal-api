const repo = require("../repos/info");

const getAll = async (req, res) => {
  try {
    res.json({
      github: await repo.getGithub(),
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getAll,
};
