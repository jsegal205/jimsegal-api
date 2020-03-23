const { validateRequiredFields } = require("../utils/validation");

class Game {
  REQUIRED_FIELDS = ["title", "link", "image", "bggId"];

  constructor(title, link, image, bggId) {
    this.title = title.trim() || "";
    this.link = link.trim() || "";
    this.image = image.trim() || "";
    this.bggId = bggId || 0;
  }

  isValid = () => validateRequiredFields(this);
}

module.exports = Game;
