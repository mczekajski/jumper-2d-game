// GLOBAL:

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext('2d');

// LOAD IMAGES :
const runImgs = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
];
runImgs[0].src = 'img/char/run/frame-1.png';
runImgs[1].src = 'img/char/run/frame-2.png';
runImgs[2].src = 'img/char/run/frame-3.png';
runImgs[3].src = 'img/char/run/frame-4.png';
runImgs[4].src = 'img/char/run/frame-5.png';

const jumpImgs = [
    new Image(),
    new Image(),
];
jumpImgs[0].src = 'img/char/jump/jump-up.png';
jumpImgs[1].src = 'img/char/jump/jump-fall.png';

const standImgs = [
    new Image(),
    new Image(),
];
standImgs[0].src = 'img/char/standing/frame-1.png';
standImgs[1].src = 'img/char/standing/frame-2.png';

const dieImgs = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
];
dieImgs[0].src = 'img/char/faint/frame-1.png';
dieImgs[1].src = 'img/char/faint/frame-2.png';
dieImgs[2].src = 'img/char/faint/frame-3.png';
dieImgs[3].src = 'img/char/faint/frame-4.png';
dieImgs[4].src = 'img/char/faint/frame-5.png';

const fireBallImgs = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
];
fireBallImgs[0].src = 'img/objs/fireball/move/fireball_1.png';
fireBallImgs[1].src = 'img/objs/fireball/move/fireball_2.png';
fireBallImgs[2].src = 'img/objs/fireball/move/fireball_3.png';
fireBallImgs[3].src = 'img/objs/fireball/move/fireball_4.png';
fireBallImgs[4].src = 'img/objs/fireball/move/fireball_5.png';


// CLASSES:
class Game {
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
                case "die":
                    player.drawPlayerDying();
                    break;
                case "run":
                    player.drawPlayerRunning();
                    break;
                case "jump":
                    player.drawPlayerJumping();
                    break;
                default:
                    player.drawPlayerStanding();
            }
        }
        else {
            player.drawPlayerDying();
        }
    }

    drawFireBall(fireball) {
        fireball.drawFireBall();
    }

}

class Player {
    constructor() {
        this.activity = "stand";
        this.jumpSpeed = 21;
        this.image = new Image();
        this.image.src = 'img/char/standing/frame-1.png';
        this.currentJumpHeight = 0;
        this.afterJumpActivity = "stand";
        this.frame = 1;
        this.date = Date.now();
        this.xPosition = canvas.width / 2 - this.image.width / 2;
        this.yPosition = canvas.height - this.image.height - 50;
        this.alive = true;

        window.addEventListener('keydown', e => {
            if (e.key === ' ' || e.key === 'Spacebar') {
                if (this.activity != "jump") this.afterJumpActivity = this.activity;
                this.jump();
            }
            if (e.key === 'ArrowRight') this.run();
            if (e.key === 'ArrowRight' && this.activity === 'jump') this.afterJumpActivity = 'run';
        });
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowRight') this.stand();
            if (e.key === 'ArrowRight' && this.activity === 'jump') this.afterJumpActivity = 'stand';
        });
    }

    stand() {
        if (this.activity != "jump") {
            this.activity = "stand";
        }
    }

    run() {
        if (this.activity != "jump") {
            this.activity = "run";
        }

    }

    jump() {
        this.activity = "jump";
    }

    die() {
        this.frame = 1;
        this.activity = "die";
    }

    drawPlayerStanding() {
        //console.log("Player is standing!");
        (Date.now() % 1000 > 500) ? this.frame = 2: this.frame = 1;
        this.image.src = `img/char/standing/frame-${this.frame}.png`;
        this.yPosition = canvas.height - this.image.height - 50;
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
        this.yPosition = canvas.height - this.image.height - 50;
        ctx.drawImage(this.image, this.xPosition, this.yPosition);
    }

    drawPlayerJumping() {
        //console.log("Player is jumping!");
        player.currentJumpHeight += player.jumpSpeed;
        player.jumpSpeed -= 0.7;
        player.jumpSpeed > 0 ? player.image.src = 'img/char/jump/jump-up.png' : player.image.src = 'img/char/jump/jump-fall.png';

        if (player.currentJumpHeight + player.jumpSpeed <= 0) {
            player.jumpSpeed = 21;
            player.currentJumpHeight = 0;
            player.activity = player.afterJumpActivity;
        }
        this.date = Date.now();
        this.yPosition = canvas.height - this.image.height - 50 - player.currentJumpHeight;
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
        this.yPosition = canvas.height - this.image.height - 50;
        ctx.drawImage(this.image, this.xPosition, this.yPosition);
    }
}

class FireBall {
    constructor(speed, xPosition, yPosition) {
        this.speed = speed;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.image = new Image();
        this.image.src = 'img/objs/fireball/move/fireball_1.png';
        this.frame = 1;
        this.date = Date.now();

        this.drawFireBall();
    }

    drawFireBall() {
        //console.log("Fireball!");  
        if (Date.now() - this.date > 80) {
            if (this.frame < 5) {
                this.frame++;
            } else {
                this.frame = 1;
            }
            this.date = Date.now();
        }
        this.image.src = `img/objs/fireball/move/fireball_${this.frame}.png`;
        this.xPosition -= this.speed;
        //console.log(this.xPosition);
        this.xPosition < -1000 ? this.xPosition = canvas.width + 500 : this.xPosition = this.xPosition;
        ctx.drawImage(this.image, this.xPosition, this.yPosition, this.image.width * 1.2, this.image.height * 1.2);
    }
}

// CREATE GAME OBJECTS AND CALL FUNCTIONS:
const game = new Game();
const player = new Player();
let fireBall = new FireBall(10, canvas.width + 500, canvas.height - 220);

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.drawBottomLine();
    game.drawPlayer(player);
    game.drawFireBall(fireBall);

    if (player.alive && Math.abs(player.xPosition + player.image.width / 2 - fireBall.xPosition) < 50 && player.currentJumpHeight < 200) {
        player.alive = false;
        fireBall.speed = 0;
        fireBall.xPosition = -500;
        player.die();
    }
    if (!player.alive) {
        player.activity = "die";
    }
}

// START GAME: 
window.addEventListener('load', animate);