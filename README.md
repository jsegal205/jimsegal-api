# Jim Segal API

An [ExpressJS](https://expressjs.com/) web server built on [NodeJS](https://nodejs.org/en/).

## Local development

### Run the server

To start a local server, run the following command:

```bash
  npm run dev
```

### Run the server with breakpoints

To stop processing in the server at any point, add a `debugger` to the code and start the server with the following command:

```bash
  npm run debug
```

#### Repl

Even when running in debug mode, to access any runtime variables you will need to do so by entering the repl with the following command:

```bash
  repl
```

### Viewing API

Open a web browser to the following address:

`http://localhost:8001`

This is the default port, and could be altered if defined in `process.env.PORT` via the [dotenv file](https://www.npmjs.com/package/dotenv).
