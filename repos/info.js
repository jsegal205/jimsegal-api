const axios = require("axios");

const getGithub = async () => {
  try {
    const apiRes = await axios
      .get("https://api.github.com/users/jsegal205/events/public")
      .catch((error) => {
        throw error;
      });

    const lastPushes = apiRes.data
      .filter((event) => event.type === "PushEvent")
      .filter((push) => push.payload.ref !== "refs/heads/gh-pages");

    return lastPushes.map((push) => {
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
    });
  } catch (err) {
    throw err;
  }
};

module.exports = { getGithub };
