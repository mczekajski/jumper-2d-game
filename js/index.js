import Game from "./game.js";
import Player from "./player.js";

// GLOBAL:
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const GAME_WIDTH = 1920;
const GAME_HEIGHT = 1080;

canvas.height = 1080;
canvas.width = 1920;
canvas.style.maxWidth = (1920 / 1080) * window.innerWidth;

const div = document.querySelector("div");
div.style.height = 100 + "vh";
div.style.width = 100 + "vw";

// CREATE GAME OBJECTS AND CALL FUNCTIONS:
let game = new Game(ctx, GAME_WIDTH, GAME_HEIGHT);
//let fireBall = new FireBall(10, canvas.width + 500, canvas.height * 0.65);

let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update();
  game.draw();

  // game.drawBackground();
  // game.drawPlayer(player);
  // game.drawFireBall(fireBall);

  // FIREBALL COLLISION
  // if (
  //   player.alive &&
  //   Math.abs(
  //     player.xPosition + player.image.width / 2 - fireBall.xPosition - 50
  //   ) < 100 &&
  //   player.currentJumpHeight < 250
  // ) {
  //   player.alive = false;
  //   fireBall.speed = 0;
  //   fireBall.xPosition = -500;
  //   player.die();
  //   player.xAxisMovement = 0;
  // }
  // if (!player.alive) {
  //   player.activity = "die";
  //   player.xAxisMovement = 0;
  // }

  requestAnimationFrame(gameLoop);
}

// START GAME:
window.addEventListener("load", () => {
  requestAnimationFrame(gameLoop);
});
