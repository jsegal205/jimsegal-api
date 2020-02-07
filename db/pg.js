const Pool = require("pg-pool");
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

const pool = new Pool(config);

// for local development, comment out above, uncomment below
// const pool = new Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: 5432
// });

const query = async query => {
  if (!query) {
    throw "no query provided";
  }

  const client = await pool.connect();
  try {
    const result = await client.query(query);

    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { query };
