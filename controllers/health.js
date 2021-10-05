const get = async (req, res) => {
  try {
    return res.json({
      app_name: process.env.HEROKU_APP_NAME || "<dev>",
      commit: process.env.HEROKU_SLUG_COMMIT || "<dev>",
      updated_at: process.env.HEROKU_RELEASE_CREATED_AT || "<dev>",
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { get };
