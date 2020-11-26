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

  draw(game) {
    this.backgroundPosition -= this.player.xAxisMovement / 3;
    if (this.backgroundPosition <= -game.width) this.backgroundPosition = 0;
    game.ctx.drawImage(
      this.background,
      this.backgroundPosition,
      0,
      game.width,
      game.height
    );
    game.ctx.drawImage(
      this.background,
      this.backgroundPosition + game.width - 1,
      0,
      game.width,
      game.height
    );

    this.groundPosition -= this.player.xAxisMovement;
    if (this.groundPosition <= -game.width) this.groundPosition = 0;

    game.ctx.drawImage(
      this.ground,
      this.groundPosition,
      game.height - this.ground.height,
      game.width,
      this.ground.height
    );

    game.ctx.drawImage(
      this.ground,
      this.groundPosition + this.ground.width - 1,
      game.height - this.ground.height,
      game.width,
      this.ground.height
    );

    game.ctx.drawImage(this.cloud, 0, 0);
  }
}
