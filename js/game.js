import Player from "./player.js";
import Fireball from "./fireball.js";
import InputHandler from "./inputHandler.js";
import Background from "./background.js";

export default class Game {
  constructor(ctx, gameWidth, gameHeight) {
    this.width = gameWidth;
    this.height = gameHeight;
    this.ctx = ctx;

    this.player = new Player(this);
    this.background = new Background(this);
    this.fireball = new Fireball(10, this.width + 500, this.height * 0.65);

    new InputHandler(this.player);
  }

  update() {}

  draw() {
    this.background.draw(this.ctx, this.width, this.height);
    this.player.draw(this.ctx, this.width, this.height);
    this.fireball.draw(this.ctx, this.width, this.player.xAxisMovement);
  }
}
