const axios = require("axios");

const getAll = async (req, res) => {
  try {
    const API_URL = `https://api.github.com/users/jsegal205/events/public`;
    const api_res = await axios(API_URL).catch((error) => {
      throw error;
    });

    const lastPushes = api_res.data
      .filter((event) => event.type === "PushEvent")
      .filter((push) => push.payload.ref !== "refs/heads/gh-pages");

    res.json({
      github: lastPushes.map((push) => {
        return {
          repoName: push.repo.name,
          commits: push.payload.commits.map((commit) => {
            return {
              sha: commit.sha,
              message: commit.message,
            };
          }),
          createdAt: push.created_at,
        };
      }),
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getAll,
};
