export default class InputHandler {
  constructor(player, game) {
    window.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Spacebar" || e.key === "ArrowUp") {
        if (game.state === game.GAMESTATE.GAMEOVER) game.restartGame();
        else if (player.alive && player.activity != "jump") {
          player.afterJumpActivity = player.activity;
          player.setActivity("jump");
        }
      }
      if (player.alive && e.key === "ArrowRight") player.setActivity("run");
      if (e.key === "ArrowRight" && player.activity === "jump")
        player.afterJumpActivity = "run";
      if (e.key === "Enter") console.log("Enter!");
    });
    window.addEventListener("keyup", (e) => {
      if (player.alive && e.key === "ArrowRight") player.setActivity("stand");
      if (player.alive && e.key === "ArrowRight" && player.activity === "jump")
        player.afterJumpActivity = "stand";
    });
  }
}
