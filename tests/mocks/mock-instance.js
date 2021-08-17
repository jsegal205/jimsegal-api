const MockAdapter = require("axios-mock-adapter");
const axios = require("axios");

module.exports = new MockAdapter(axios);
