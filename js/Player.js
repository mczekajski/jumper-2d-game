export default class Player {
  constructor(game) {
    this.groundLevel = game.groundLevel;
    this.activity = "stand";
    this.initialJumpSpeed = 30;
    this.jumpSpeed = this.initialJumpSpeed;
    this.image = new Image();
    this.image.src = "img/char/standing/frame-1.png";
    this.currentJumpHeight = 0;
    this.afterJumpActivity = "stand";
    this.frame = 1;
    this.date = Date.now();
    this.xPosition = game.width / 2 - this.image.width / 2;
    this.yPosition = game.height - this.image.height - game.groundLevel;
    this.alive = true;
    this.xAxisMovement = 0;
  }

  setActivity(activity) {
    switch (activity) {
      case "stand":
        if (this.activity != "jump") {
          this.activity = "stand";
          this.xAxisMovement = 0;
        }
        break;
      case "run":
        if (this.activity != "jump") {
          this.activity = "run";
          this.xAxisMovement = 10;
        }
        break;
      case "jump":
        this.activity = "jump";
        if (this.afterJumpActivity === "run") this.xAxisMovement = 10
        if (this.afterJumpActivity === "stand") this.xAxisMovement = 0
        break;
      case "die":
        this.jumpSpeed = this.initialJumpSpeed;
        this.currentJumpHeight = 0;
        this.activity = "die";
        break;
      default:
        if (this.activity != "jump") {
          this.activity = "stand";
        }
    }
  }

  drawPlayerStanding(game) {
    Date.now() % 1000 > 500 ? (this.frame = 2) : (this.frame = 1);
    this.image.src = `img/char/standing/frame-${this.frame}.png`;
    this.xPosition = game.width / 2 - this.image.width / 2;
    this.yPosition = game.height - this.image.height - game.groundLevel;
    game.ctx.drawImage(this.image, this.xPosition, this.yPosition);
  }

  drawPlayerRunning(game) {
    if (Date.now() - this.date > 80) {
      if (this.frame < 5) {
        this.frame++;
      } else {
        this.frame = 1;
      }
      this.date = Date.now();
    }
    this.image.src = `img/char/run/frame-${this.frame}.png`;
    this.xPosition = game.width / 2 - this.image.width / 2;
    this.yPosition = game.height - this.image.height - game.groundLevel;
    game.ctx.drawImage(this.image, this.xPosition, this.yPosition);
  }

  drawPlayerJumping(game) {
    this.currentJumpHeight += this.jumpSpeed;
    this.jumpSpeed -= 1.2;
    this.jumpSpeed > 0
      ? (this.image.src = "img/char/jump/jump-up.png")
      : (this.image.src = "img/char/jump/jump-fall.png");

    if (this.afterJumpActivity === "die") {
      this.image.src = `img/char/faint/frame-1.png`;
      this.jumpSpeed > 0 ? this.jumpSpeed = 0 : this.jumpSpeed = this.jumpSpeed;
    }

    if (this.currentJumpHeight + this.jumpSpeed <= 0) {
      this.jumpSpeed = this.initialJumpSpeed;
      this.currentJumpHeight = 0;
      this.activity = this.afterJumpActivity;
      if (this.afterJumpActivity === "run") {
        this.setActivity("run");
        this.xAxisMovement = 10;
      }
      else this.xAxisMovement = 0;
    }
    this.date = Date.now();
    this.xPosition = game.width / 2 - this.image.width / 2;
    this.yPosition =
      game.height -
      this.image.height -
      game.groundLevel -
      this.currentJumpHeight;
    game.ctx.drawImage(this.image, this.xPosition, this.yPosition);
  }

  drawPlayerDying(game) {
    if (Date.now() - this.date > 100) {
      if (this.frame < 5) {
        this.frame++;
      }
      this.date = Date.now();
    }
    this.image.src = `img/char/faint/frame-${this.frame}.png`;
    this.xPosition = game.width / 2 - this.image.width / 2;
    this.yPosition = game.height - this.image.height - game.groundLevel;
    game.ctx.drawImage(this.image, this.xPosition, this.yPosition);
  }

  draw(game) {
    switch (this.activity) {
      case "stand":
        this.drawPlayerStanding(game);
        break;
      case "run":
        this.drawPlayerRunning(game);
        break;
      case "jump":
        this.drawPlayerJumping(game);
        break;
      case "die":
        this.drawPlayerDying(game);
        break;
    }
  }
}
