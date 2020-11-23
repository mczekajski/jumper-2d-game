import Player from "./player.js";
import Fireball from "./fireball.js";
import InputHandler from "./inputHandler.js";
import Background from "./background.js";
import detectCollisions from "./collisionDetection.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
}

export default class Game {
  constructor(ctx, gameWidth, gameHeight) {
    this.gamestate = GAMESTATE.MENU;
    this.width = gameWidth;
    this.height = gameHeight;
    this.ctx = ctx;

    this.gameObjects = [];
    this.player = new Player(this);
    this.background = new Background(this);
    this.gameObjects.push(new Fireball(10, this.width + 500, this.height * 0.65));

    new InputHandler(this.player);
  }

  update() {
    detectCollisions()
  }


  draw() {
    this.background.draw(this.ctx, this.width, this.height);
    this.player.draw(this.ctx, this.width, this.height);
    this.gameObjects.forEach((obj) => obj.draw(this.ctx, this.width, this.player.xAxisMovement));
  }
}
