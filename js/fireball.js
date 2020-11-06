export default class Fireball {
  constructor(speed, xPosition, yPosition) {
    this.speed = speed;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.image = new Image();
    this.image.src = "img/objs/fireball/move/fireball_1.png";
    this.frame = 1;
    this.date = Date.now();
  }

  draw(ctx, gameWidth, playerXAxisMovement) {
    if (Date.now() - this.date > 80) {
      if (this.frame < 5) {
        this.frame++;
      } else {
        this.frame = 1;
      }
      this.date = Date.now();
    }
    this.image.src = `img/objs/fireball/move/fireball_${this.frame}.png`;
    this.xPosition -= this.speed + playerXAxisMovement;

    // Move fireball to the right side of a map
    this.xPosition < -1000
      ? (this.xPosition = gameWidth + 500)
      : (this.xPosition = this.xPosition);

    ctx.drawImage(
      this.image,
      this.xPosition,
      this.yPosition,
      this.image.width * 1.2,
      this.image.height * 1.2
    );
  }
}
