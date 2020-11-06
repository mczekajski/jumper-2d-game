export default class Background {
  constructor(game) {
    this.player = game.player;
    this.background = new Image();
    this.background.src = "img/bg/bg.svg";
    this.backgroundPosition = 0;

    this.ground = new Image();
    this.ground.src = "img/bg/ground.png";
    this.groundPosition = 0;

    this.cloud = new Image();
    this.cloud.src = "img/bg/cloud.png";
  }

  draw(ctx, gameWidth, gameHeight) {
    this.backgroundPosition -= this.player.xAxisMovement / 3;
    if (this.backgroundPosition <= -gameWidth) this.backgroundPosition = 0;
    ctx.drawImage(
      this.background,
      this.backgroundPosition,
      0,
      gameWidth,
      gameHeight
    );
    ctx.drawImage(
      this.background,
      this.backgroundPosition + gameWidth - 2,
      0,
      gameWidth,
      gameHeight
    );

    this.groundPosition -= this.player.xAxisMovement;
    if (this.groundPosition <= -gameWidth) this.groundPosition = 0;

    ctx.drawImage(
      this.ground,
      this.groundPosition,
      gameHeight - this.ground.height,
      gameWidth,
      this.ground.height
    );

    ctx.drawImage(
      this.ground,
      this.groundPosition + this.ground.width - 2,
      gameHeight - this.ground.height,
      gameWidth,
      this.ground.height
    );

    ctx.drawImage(this.cloud, 0, 0);
  }
}
