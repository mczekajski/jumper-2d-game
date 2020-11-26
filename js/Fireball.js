export default class Fireball {
  constructor(speed, game) {
    this.image = new Image();
    this.image.src = "img/objs/fireball/move/fireball_1.png";
    this.frame = 1;
    this.scale = 1.2;
    this.activity = "fly";
    this.type = "fireball";
    this.speed = speed;
    this.flyHeight = Math.floor(Math.random()*2)*400+100;
    this.xPosition = game.width;
    this.yPosition = game.height - game.groundLevel - this.image.height * this.scale - this.flyHeight;
    this.date = Date.now();
  }

  drawFly(game) {
    if (Date.now() - this.date > 80) {
      if (this.frame < 5) {
        this.frame++;
      } else {
        this.frame = 1;
      }
      this.date = Date.now();
    }
    this.image.src = `img/objs/fireball/move/fireball_${this.frame}.png`;
    this.xPosition -= this.speed + game.player.xAxisMovement;

    game.ctx.drawImage(
      this.image,
      this.xPosition,
      this.yPosition,
      this.image.width * 1.2,
      this.image.height * 1.2
    );
  }

  update(game) {
    if (this.xPosition < - 2000) {
      const objIndex = game.gameObjects.indexOf(this);
      game.gameObjects.splice(objIndex, 1);
      game.fireballs--;
    }
  }

  draw(game) {
    switch (this.activity) {
      case "fly":
        this.drawFly(game);
        break;
      default: 
        this.drawFly(game);
    }
  }
}
