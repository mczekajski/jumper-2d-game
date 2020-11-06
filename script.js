// GLOBAL:

const canvas = document.querySelector("canvas");
const div = document.querySelector("div");
canvas.height = 1080;
canvas.width = 1920;
div.style.height = 100 + "vh";
div.style.width = 100 + "vw";
canvas.style.maxWidth = (1920 / 1080) * window.innerWidth;
const ctx = canvas.getContext("2d");

// CLASSES:
class Game {
  constructor() {
    this.background = new Image();
    this.background.src = "img/bg.svg";
    this.backgroundPosition = 0;

    this.ground = new Image();
    this.ground.src = "img/ground.png";
    this.groundPosition = 0;
  }

  drawBottomLine() {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 50);
    ctx.lineTo(canvas.width, canvas.height - 50);
    ctx.lineWidth = 5;
    ctx.stroke();
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

class Player {
  constructor() {
    this.activity = "stand";
    this.jumpSpeed = 21;
    this.image = new Image();
    this.image.src = "img/char/standing/frame-1.png";
    this.currentJumpHeight = 0;
    this.afterJumpActivity = "stand";
    this.frame = 1;
    this.date = Date.now();
    this.xPosition = canvas.width / 2 - this.image.width / 2;
    this.yPosition = canvas.height - this.image.height - 50;
    this.alive = true;
    this.xAxisMovement = 0;

    window.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Spacebar") {
        if (this.activity != "jump") this.afterJumpActivity = this.activity;
        this.jump();
      }
      if (e.key === "ArrowRight" && this.alive) this.run();
      if (e.key === "ArrowRight" && this.activity === "jump")
        this.afterJumpActivity = "run";
      if (e.key === "Enter") console.log("Enter!");
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight") this.stand();
      if (e.key === "ArrowRight" && this.activity === "jump")
        this.afterJumpActivity = "stand";
    });
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

  drawPlayerStanding() {
    //console.log("Player is standing!");
    Date.now() % 1000 > 500 ? (this.frame = 2) : (this.frame = 1);
    this.image.src = `img/char/standing/frame-${this.frame}.png`;
    this.xPosition = canvas.width / 2 - this.image.width / 2;
    this.yPosition = canvas.height - this.image.height - canvas.height * 0.17;
    ctx.drawImage(this.image, this.xPosition, this.yPosition);
  }

  drawPlayerRunning() {
    //console.log("Player is running!");
    if (Date.now() - this.date > 80) {
      if (this.frame < 5) {
        this.frame++;
      } else {
        this.frame = 1;
      }
      this.date = Date.now();
    }
    this.image.src = `img/char/run/frame-${this.frame}.png`;
    this.xPosition = canvas.width / 2 - this.image.width / 2;
    this.yPosition = canvas.height - this.image.height - canvas.height * 0.17;
    ctx.drawImage(this.image, this.xPosition, this.yPosition);
  }

  drawPlayerJumping() {
    //console.log("Player is jumping!");
    player.currentJumpHeight += player.jumpSpeed;
    player.jumpSpeed -= 0.7;
    player.jumpSpeed > 0
      ? (player.image.src = "img/char/jump/jump-up.png")
      : (player.image.src = "img/char/jump/jump-fall.png");

    if (player.currentJumpHeight + player.jumpSpeed <= 0) {
      player.jumpSpeed = 21;
      player.currentJumpHeight = 0;
      player.activity = player.afterJumpActivity;
      if (player.afterJumpActivity === "run") {
        player.run();
        player.xAxisMovement = 10;
      } else {
        player.xAxisMovement = 0;
      }
    }
    this.date = Date.now();
    this.xPosition = canvas.width / 2 - this.image.width / 2;
    this.yPosition =
      canvas.height -
      this.image.height -
      canvas.height * 0.17 -
      player.currentJumpHeight;
    ctx.drawImage(player.image, this.xPosition, this.yPosition);
  }

  drawPlayerDying() {
    if (Date.now() - this.date > 100) {
      if (this.frame < 5) {
        this.frame++;
      }
      this.date = Date.now();
    }
    this.image.src = `img/char/faint/frame-${this.frame}.png`;
    this.xPosition = canvas.width / 2 - this.image.width / 2;
    this.yPosition = canvas.height - this.image.height - canvas.height * 0.17;
    ctx.drawImage(this.image, this.xPosition, this.yPosition);
  }
}

class FireBall {
  constructor(speed, xPosition, yPosition) {
    this.speed = speed;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.image = new Image();
    this.image.src = "img/objs/fireball/move/fireball_1.png";
    this.frame = 1;
    this.date = Date.now();

    this.drawFireBall();
  }

  drawFireBall() {
    if (Date.now() - this.date > 80) {
      if (this.frame < 5) {
        this.frame++;
      } else {
        this.frame = 1;
      }
      this.date = Date.now();
    }
    this.image.src = `img/objs/fireball/move/fireball_${this.frame}.png`;
    this.xPosition -= this.speed + player.xAxisMovement;

    // Move fireball to the right side of a map
    this.xPosition < -1000
      ? (this.xPosition = canvas.width + 500)
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

// CREATE GAME OBJECTS AND CALL FUNCTIONS:
let game = new Game();
let player = new Player();
let fireBall = new FireBall(10, canvas.width + 500, canvas.height * 0.65);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.drawBackground();
  //game.drawBottomLine();
  game.drawPlayer(player);
  game.drawFireBall(fireBall);

  // FIREBALL COLLISION
  if (
    player.alive &&
    Math.abs(
      player.xPosition + player.image.width / 2 - fireBall.xPosition - 50
    ) < 100 &&
    player.currentJumpHeight < 250
  ) {
    player.alive = false;
    fireBall.speed = 0;
    fireBall.xPosition = -500;
    player.die();
    player.xAxisMovement = 0;
  }
  if (!player.alive) {
    player.activity = "die";
    player.xAxisMovement = 0;
  }
}

// START GAME:
window.addEventListener("load", animate);
