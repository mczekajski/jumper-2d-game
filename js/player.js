export default class Player {
  constructor(game) {
    this.activity = "stand";
    this.jumpSpeed = 21;
    this.image = new Image();
    this.image.src = "img/char/standing/frame-1.png";
    this.currentJumpHeight = 0;
    this.afterJumpActivity = "stand";
    this.frame = 1;
    this.date = Date.now();
    this.xPosition = game.gameWidth / 2 - this.image.width / 2;
    this.yPosition = game.gameHeight - this.image.height - 50;
    this.alive = true;
    this.xAxisMovement = 0;
  }

  stand() {
    if (this.activity != "jump") {
      this.activity = "stand";
      this.xAxisMovement = 0;
    }
  }

  run() {
    if (this.activity != "jump") {
      this.activity = "run";
      this.xAxisMovement = 10;
    }
  }

  jump() {
    this.activity = "jump";
    this.afterJumpActivity === "run"
      ? (this.xAxisMovement = 10)
      : (this.xAxisMovement = 0);
  }

  die() {
    this.frame = 1;
    this.activity = "die";
    this.xAxisMovement = 0;
  }

  drawPlayerStanding(ctx, gameWidth, gameHeight) {
    //console.log("Player is standing!");
    Date.now() % 1000 > 500 ? (this.frame = 2) : (this.frame = 1);
    this.image.src = `img/char/standing/frame-${this.frame}.png`;
    this.xPosition = gameWidth / 2 - this.image.width / 2;
    this.yPosition = gameHeight - this.image.height - gameHeight * 0.17;
    ctx.drawImage(this.image, this.xPosition, this.yPosition);
  }

  drawPlayerRunning(ctx, gameWidth, gameHeight) {
    if (Date.now() - this.date > 80) {
      if (this.frame < 5) {
        this.frame++;
      } else {
        this.frame = 1;
      }
      this.date = Date.now();
    }
    this.image.src = `img/char/run/frame-${this.frame}.png`;
    this.xPosition = gameWidth / 2 - this.image.width / 2;
    this.yPosition = gameHeight - this.image.height - gameHeight * 0.17;
    ctx.drawImage(this.image, this.xPosition, this.yPosition);
  }

  drawPlayerJumping(ctx, gameWidth, gameHeight) {
    this.currentJumpHeight += this.jumpSpeed;
    this.jumpSpeed -= 0.7;
    this.jumpSpeed > 0
      ? (this.image.src = "img/char/jump/jump-up.png")
      : (this.image.src = "img/char/jump/jump-fall.png");

    if (this.currentJumpHeight + this.jumpSpeed <= 0) {
      this.jumpSpeed = 21;
      this.currentJumpHeight = 0;
      this.activity = this.afterJumpActivity;
      if (this.afterJumpActivity === "run") {
        this.run();
        this.xAxisMovement = 10;
      } else {
        this.xAxisMovement = 0;
      }
    }
    this.date = Date.now();
    this.xPosition = gameWidth / 2 - this.image.width / 2;
    this.yPosition =
      gameHeight -
      this.image.height -
      gameHeight * 0.17 -
      this.currentJumpHeight;
    ctx.drawImage(this.image, this.xPosition, this.yPosition);
  }

  drawPlayerDying(ctx, gameWidth, gameHeight) {
    if (Date.now() - this.date > 100) {
      if (this.frame < 5) {
        this.frame++;
      }
      this.date = Date.now();
    }
    this.image.src = `img/char/faint/frame-${this.frame}.png`;
    this.xPosition = gameWidth / 2 - this.image.width / 2;
    this.yPosition = gameHeight - this.image.height - gameHeight * 0.17;
    ctx.drawImage(this.image, this.xPosition, this.yPosition);
  }

  draw(ctx, gameWidth, gameHeight) {
    switch (this.activity) {
      case "stand":
        this.drawPlayerStanding(ctx, gameWidth, gameHeight);
        break;
      case "run":
        this.drawPlayerRunning(ctx, gameWidth, gameHeight);
        break;
      case "jump":
        this.drawPlayerJumping(ctx, gameWidth, gameHeight);
        break;
      case "die":
        this.drawPlayerDying(ctx, gameWidth, gameHeight);
        break;
    }
  }
}
