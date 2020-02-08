const cors = require("cors");
const sslRedirect = require("./ssl-redirect");
const morgan = require("morgan");

const allowedOrigins = [
  "http://localhost:8000",
  "https://jimsegal.com",
  "https://www.jimsegal.com"
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
    }
  }),
  sslRedirect(),
  morgan(
    `":remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status - :response-time ms - :res[content-length] ":referrer" ":user-agent"`
  )
];

module.exports = middlewares;