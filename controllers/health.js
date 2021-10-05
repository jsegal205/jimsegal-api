const get = async (req, res) => {
  try {
    const cs = require("child_process");
    const hash = cs.execSync("git rev-parse HEAD").toString().trim();
    const ts = cs
      .execSync('git log -1 --date=format:"%Y/%m/%d %T%z" --format="%ad"')
      .toString()
      .replace("\n", "");
    return res.json({
      commit: hash,
      updated_at: ts,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { get };
