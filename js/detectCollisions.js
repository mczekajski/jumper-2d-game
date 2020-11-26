export default function detectCollisions(player, game, gameObjects) {
  gameObjects.forEach((gameObject) => {
    switch (gameObject.type) {
      case "fireball":
        if (
          player.alive &&
          Math.abs(
            player.xPosition +
              player.image.width / 2 -
              gameObject.xPosition -
              80
          ) < 100
        ) {
          if (
            (gameObject.flyHeight < 400 && player.currentJumpHeight < gameObject.flyHeight + 50)
            ||
            (gameObject.flyHeight >= 400 && player.currentJumpHeight + 350 > gameObject.flyHeight)
            ) {
            game.state = game.GAMESTATE.LOSINGLIFE;
            player.alive = false;
            gameObject.speed = 0;
            gameObject.xPosition = -500;
            player.frame = 1;
            if (player.activity !== "jump") player.setActivity("die");
            else player.afterJumpActivity = "die";
            game.lives -= 1;
            player.xAxisMovement = 0;
          }
        }
        if (!player.alive) {
          player.setActivity("die");
          player.xAxisMovement = 0;
        }
        break;
    }
  });
}
