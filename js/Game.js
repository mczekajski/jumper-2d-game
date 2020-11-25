import Player from "./Player.js";
import Fireball from "./Fireball.js";
import InputHandler from "./InputHandler.js";
import Background from "./background.js";
import detectCollisions from "./detectCollisions.js";

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

    this.lives = 1;
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
    this.player.src = "img/char/standing/frame-1.png";
    this.player.activity = "stand";
    this.player.afterJumpActivity = "stand";
    this.player.alive = true;
    this.state = this.GAMESTATE.RUNNING;
  }

  update() {
    detectCollisions(this.player, this, this.gameObjects);
    if (this.xDistance > 2000 + this.lastDiedXDistance && this.fireballs < this.maxFireballs) {
      this.gameObjects.push(
        new Fireball(10, this.width + 500, this.height * 0.6)
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

  drawGameStatistics(ctx) {
    ctx.font = "normal 60px Nerko One";
    ctx.fillStyle = "	#009688";
    ctx.textAlign = 'left'
    ctx.fillText(`LIVES: ${this.lives}`, 30, 70);
    ctx.fillText(`COINS: ${this.coins}`, 30, 140);
    ctx.fillText(`DISTANCE: ${Math.floor(this.xDistance / 100)}`, 30, 210);
    this.xDistance += this.player.xAxisMovement;
  }

  draw(deltaTime) {
    this.background.draw(this.ctx, this.width, this.height);
    this.player.draw(this.ctx, this.width, this.height);
    this.gameObjects.forEach((obj) =>
      obj.draw(this.ctx, this.width, this.player.xAxisMovement)
    );
    this.drawGameStatistics(this.ctx);

    if (this.state === this.GAMESTATE.RUNNING && !this.player.alive) {
      this.ctx.font = 'normal 200px Nerko One';
      this.ctx.fillStyle = '#009688';
      this.ctx.textAlign = 'center'
      this.ctx.fillText('OOOPS!', this.width/2, this.height/2-100);
    }
    if (this.state === this.GAMESTATE.GAMEOVER) {
      this.ctx.font = 'normal 200px Nerko One';
      this.ctx.fillStyle = '#009688';
      this.ctx.textAlign = 'center'
      this.ctx.fillText('GAME OVER!', this.width/2, this.height/2-100);
      this.ctx.font = 'normal 60px Nerko One';
      if(Date.now() % 2000 > 400) this.ctx.fillText('Press SPACEBAR to play again', this.width/2, this.height/2);
    }
  }
}
