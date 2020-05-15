const bcrypt = require("bcrypt");

const repo = require("../repos/users");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const results = await repo.getByEmail(email);

    if (results && (await bcrypt.compare(password, results.password))) {
      // figure out how to utilize this
      res.json("you have been logged in");
    } else {
      throw Error;
    }
  } catch (error) {
    res.status(400).send("Email or Password incorrect");
  }
};

module.exports = {
  login,
};
