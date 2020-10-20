// GLOBAL:

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext('2d');
let date = new Date();
let lastAnimationUpdate = date.getTime();

// CLASSES:

class Game {
    constructor() {
        this.date = new Date();
        this.frame = 1;
        this.frameCounter = 0;
    }

    drawBottomLine() {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 100);
        ctx.lineTo(canvas.width, canvas.height - 100);
        ctx.lineWidth = 5;
        ctx.stroke();
    }

    drawPlayer() {
        switch (player.activity) {
            case "run":
                this.drawPlayerRunning();
                break;
            case "jump":
                this.drawPlayerJumping();
                break;
            default:
                this.drawPlayerStanding();
        }
    }

    changeFrame() {
        this.standingFrame == 1 ? this.standingFrame = 2 : this.standingFrame = 1;
    }

    drawPlayerStanding() {
        console.log("Player is standing!");
        this.date = new Date();
        (this.date.getMilliseconds() > 500) ? this.frame = 2: this.frame = 1;
        player.image.src = `img/char/standing/frame-${this.frame}.png`;
        ctx.drawImage(player.image, canvas.width/2 - player.image.width/2, canvas.height - player.image.height - 100);
    }

    drawPlayerRunning() {
        console.log("Player is running!");
        this.date = new Date();
        if (this.frameCounter > 3) {
            this.frameCounter = 0;
            if (this.frame < 5) {
                this.frame++;
            } 
            else {
                this.frame = 1;
            }
        }
        else {
            this.frameCounter++;
        }

        player.image.src = `img/char/run/frame-${this.frame}.png`;
        ctx.drawImage(player.image, canvas.width/2 - player.image.width/2, canvas.height - player.image.height - 100);
    }

    drawPlayerJumping() {
        console.log("Player is jumping!");
        player.currentJumpHeight += player.jumpSpeed;
        player.jumpSpeed -= 2;
        player.image.src = `img/char/jump/jump-up.png`;
        ctx.drawImage(player.image, canvas.width/2 - player.image.width/2, canvas.height - player.image.height - 100 - player.currentJumpHeight);
        if (player.currentJumpHeight < 0) {
            player.jumpSpeed = 20;
            player.currentJumpHeight = 0;
            player.activity = "stand";
        }
    }
}

class Player {
    constructor(activity, jumpSpeed, animationSpeed) {
        this.activity = activity;
        this.jumpSpeed = jumpSpeed;
        this.animationSpeed = animationSpeed;
        this.image = new Image();
        this.image.src = 'img/char/standing/frame-1.png';
        this.currentJumpHeight = 0;
    }

    stand() {
        this.activity = "stand";
    }

    run() {
        this.frameCounter = 0;
        this.activity = "run";
    }

    jump() {
        this.frameCounter = 0;
        this.activity = "jump";
    }

}

// GAME:

const game = new Game();
const player = new Player("stand", 20, 80);

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.drawBottomLine();
    game.drawPlayer();
}

window.addEventListener('keydown', e => {
    if (e.keyCode === 32 && player.activity != "jump") player.jump();
    if (e.keyCode === 39) player.run();
});
window.addEventListener('keyup', e => {
    if (e.keyCode === 39) player.stand();
});

window.addEventListener('load', animate);