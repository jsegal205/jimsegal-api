import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { sslRedirect } from "./ssl-redirect.js";

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
            "The CORS policy for this site does not allow access from the specified Origin.",
          ),
          false,
        );
      }
      return callback(null, true);
    },
  }),
  sslRedirect(),
  morgan(
    `":remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status - :response-time ms - :res[content-length] ":referrer" ":user-agent"`,
  ),
  express.json(),
  // https://expressjs.com/en/starter/static-files.html
  // so that I don't have to serve inline js
  express.static("docs"),
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        // https://stackoverflow.com/questions/63750968/content-security-policy-preventing-images-from-loading
        // serving favico avatar
        "img-src": ["'self'", "avatars1.githubusercontent.com"],
      },
    },
  }),
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
];

export default middlewares;
