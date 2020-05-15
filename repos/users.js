const db = require("../db/pg");

const getByEmail = async (email) => {
  const results = await db.query(
    `select email, password from users where email = $1`,
    [email]
  );

  if (results.length === 0) {
    return null;
  }

  // with case insensitive and uniq emails, just return the first result
  return results[0];
};

module.exports = {
  getByEmail,
};
