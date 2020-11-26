export default function drawGameStatistics(game) {
    // Draw game statistics:
    game.ctx.font = "normal 60px Nerko One";
    game.ctx.fillStyle = "#009688";
    game.ctx.textAlign = "left";
    game.ctx.fillText(`LIVES: ${game.lives}`, 30, 70);
    game.ctx.fillText(`COINS: ${game.coins}`, 30, 140);
    game.ctx.fillText(`DISTANCE: ${Math.floor(game.xDistance / 100)}`, 30, 210);

    // Draw losing life message:
    if (game.state === game.GAMESTATE.RUNNING && !game.player.alive) {
        game.ctx.font = 'normal 200px Nerko One';
        game.ctx.fillStyle = '#009688';
        game.ctx.textAlign = 'center'
        game.ctx.fillText('OOOPS!', game.width/2, game.height/2-100);
      }
      // Draw game-over message:
      if (game.state === game.GAMESTATE.GAMEOVER) {
        game.ctx.font = 'normal 200px Nerko One';
        game.ctx.fillStyle = '#009688';
        game.ctx.textAlign = 'center'
        game.ctx.fillText('GAME OVER!', game.width/2, game.height/2-100);
        game.ctx.font = 'normal 60px Nerko One';
        if(Date.now() % 2000 > 400) game.ctx.fillText('Press SPACEBAR to play again', game.width/2, game.height/2);
      }
}
