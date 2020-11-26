import Player from "./Player.js";
import Fireball from "./Fireball.js";
import InputHandler from "./InputHandler.js";
import Background from "./Background.js";
import detectCollisions from "./detectCollisions.js";
import drawGameStatisticsAndMessages from "./drawGameStatisticsAndMessages.js";

export default class Game {
  constructor(ctx, gameWidth, gameHeight) {

    this.GAMESTATE = {
      MENU: 0,
      RUNNING: 1,
      PAUSED: 2,
      LOSINGLIFE: 3,
      GAMEOVER: 4,
    };

    this.state = this.GAMESTATE.RUNNING;
    this.width = gameWidth;
    this.height = gameHeight;
    this.ctx = ctx;
    this.groundLevel = 185;

    this.lives = 3;
    this.coins = 0;
    this.xDistance = 0;

    this.lastDiedXDistance = 0;
    this.maxFireballs = 1;
    this.fireballs = 0;

    this.gameObjects = [];
    this.player = new Player(this);
    this.background = new Background(this);

    new InputHandler(this.player, this);
  }

  restartGame() {
    this.lives = 3;
    this.coins = 0;
    this.xDistance = 0;
    this.lastDiedXDistance = 0;
    this.maxFireballs = 1;
    this.fireballs = 0;
    this.gameObjects = [];
    this.background.backgroundPosition = 0;
    this.background.groundPosition = 0;
    this.player.frame = 1;
    this.player.currentJumpHeight = 0;
    this.player.jumpSpeed = this.player.initialJumpSpeed;
    this.player.src = "img/char/standing/frame-1.png";
    this.player.activity = "stand";
    this.player.afterJumpActivity = "stand";
    this.player.alive = true;
    this.state = this.GAMESTATE.RUNNING;
  }

  update() {
    this.gameObjects.forEach((obj) =>
      obj.update(this)
    );

    detectCollisions(this.player, this, this.gameObjects);

    // Update distance
    this.xDistance += this.player.xAxisMovement;

    if (this.xDistance > 2000 + this.lastDiedXDistance && this.fireballs < this.maxFireballs) {
      this.gameObjects.push(
        new Fireball(10, this)
      );
      this.fireballs++;
    }

    if (this.state === this.GAMESTATE.LOSINGLIFE) {
      if (this.lives === 0) this.state = this.GAMESTATE.GAMEOVER;
      else {
        this.lastDiedXDistance = this.xDistance;
        setTimeout(() => {
          this.player.alive = true;
          this.player.activity = "stand";
          this.fireballs = 0;
          this.gameObjects = [];
        }, 2000);
        this.state = this.GAMESTATE.RUNNING;
      }
    }
  }

  draw() {
    this.background.draw(this);
    this.player.draw(this);
    this.gameObjects.forEach((obj) =>
      obj.draw(this)
    );
    drawGameStatisticsAndMessages(this)
  }
}
