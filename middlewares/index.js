const cors = require("cors");
const sslRedirect = require("./ssl-redirect");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const allowedOrigins = [
  "http://localhost:8000", // web
  "https://jimsegal.com",
  "https://www.jimsegal.com",
  "http://localhost:8100", // projects
  "https://projects.jimsegal.com",
  "https://jimsegal.dev",
  "https://www.jimsegal.dev",
];

const middlewares = [
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin,
      // ie going directly to api.jimsegal.com or using curl
      if (!origin) {
        return callback(null, true);
      }

      if (!allowedOrigins.includes(origin)) {
        return callback(
          new Error(
            "The CORS policy for this site does not allow access from the specified Origin."
          ),
          false
        );
      }
      return callback(null, true);
    },
  }),
  sslRedirect(),
  morgan(
    `":remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status - :response-time ms - :res[content-length] ":referrer" ":user-agent"`
  ),
  bodyParser.json(),
];

module.exports = middlewares;
