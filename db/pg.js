const Pool = require("pg-pool");

const configurePool = async () => {
  if (process.env.HOST === "production") {
    const url = require("url");

    const params = url.parse(process.env.PG_DATABASE_URL);
    const auth = params.auth.split(":");

    const config = {
      user: auth[0],
      password: auth[1],
      host: params.hostname,
      port: params.port,
      database: params.pathname.split("/")[1],
      ssl: {
        rejectUnauthorized: false
      }
    };

    return new Pool(config);
  }

  if (process.env.HOST === "development") {
    return new Pool({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: 5432
    });
  }

  throw ReferenceError("Pool connection not set up");
};

const query = async (query, params) => {
  if (!query) {
    throw ReferenceError("No query provided");
  }

  const pool = await configurePool();
  const client = await pool.connect();

  try {
    const result = await client.query(query, params);

    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { query };
