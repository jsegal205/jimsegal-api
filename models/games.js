class Game {
  constructor(title, link, image, bggId) {
    this.title = title || "";
    this.link = link || "";
    this.image = image || "";
    this.bggId = bggId || "";
  }

  isValid = () =>
    [this.title, this.link, this.image, this.bggId].every(param => !!param);
}

module.exports = Game;
