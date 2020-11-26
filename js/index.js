import Game from "./Game.js";

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

let game = new Game(ctx, GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update();
  game.draw();

  requestAnimationFrame(gameLoop);
}

// START GAME:
window.addEventListener("load", () => {
  requestAnimationFrame(gameLoop);
});
