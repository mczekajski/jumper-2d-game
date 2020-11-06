export default class InputHandler {
  constructor(player) {
    window.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Spacebar") {
        if (player.activity != "jump")
          player.afterJumpActivity = player.activity;
        player.jump();
      }
      if (e.key === "ArrowRight" && player.alive) player.run();
      if (e.key === "ArrowRight" && player.activity === "jump")
        player.afterJumpActivity = "run";
      if (e.key === "Enter") console.log("Enter!");
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight") player.stand();
      if (e.key === "ArrowRight" && player.activity === "jump")
        player.afterJumpActivity = "stand";
    });
  }
}
