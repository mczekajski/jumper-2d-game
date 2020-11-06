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

    new InputHandler(this.player);
  }

  update() {}

  draw() {
    this.background.draw(this.ctx, this.width, this.height);
    this.player.draw(this.ctx, this.width, this.height);
  }

  drawPlayer(player) {
    if (player.alive) {
      switch (player.activity) {
        case "run":
          player.drawPlayerRunning();
          break;
        case "jump":
          player.drawPlayerJumping();
          break;
        default:
          player.drawPlayerStanding();
      }
    } else {
      player.drawPlayerDying();
    }
  }

  drawFireBall(fireball) {
    fireball.drawFireBall();
  }

  drawBackground() {
    this.backgroundPosition -= player.xAxisMovement / 3;
    if (this.backgroundPosition <= -canvas.width) this.backgroundPosition = 0;
    ctx.drawImage(
      this.background,
      this.backgroundPosition,
      0,
      canvas.width,
      canvas.height
    );
    ctx.drawImage(
      this.background,
      this.backgroundPosition + canvas.width - 1,
      0,
      canvas.width,
      canvas.height
    );

    this.groundPosition -= player.xAxisMovement;
    if (this.groundPosition <= -canvas.width) this.groundPosition = 0;
    ctx.drawImage(
      this.ground,
      this.groundPosition,
      canvas.height - this.ground.height,
      canvas.width,
      this.ground.height
    );
    ctx.drawImage(
      this.ground,
      this.groundPosition + this.ground.width - 1,
      canvas.height - this.ground.height,
      canvas.width,
      this.ground.height
    );
  }
}
