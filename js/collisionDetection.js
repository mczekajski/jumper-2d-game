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
              100
          ) < 100 &&
          player.currentJumpHeight < 200
        ) {
          game.state = 3;
          player.alive = false;
          gameObject.speed = 0;
          gameObject.xPosition = -500;
          player.die();
          game.lives -= 1;
          player.xAxisMovement = 0;
        }
        if (!player.alive) {
          player.activity = "die";
          player.xAxisMovement = 0;
        }
        break;
    }
  });
}
