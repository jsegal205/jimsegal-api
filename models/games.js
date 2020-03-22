class Game {
  constructor(title, link, image, bggId) {
    this.title = title.trim() || "";
    this.link = link.trim() || "";
    this.image = image.trim() || "";
    this.bggId = bggId || 0;
  }

  isValid = () =>
    [this.title, this.link, this.image, this.bggId].every(param => !!param);
}

module.exports = Game;
