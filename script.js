// GLOBAL:

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext('2d');
let date = new Date();
let lastAnimationUpdate = date.getTime();

// LOAD IMAGES :

const runImgs = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
]
runImgs[0].src = 'img/char/run/frame-1.png';
runImgs[1].src = 'img/char/run/frame-2.png';
runImgs[2].src = 'img/char/run/frame-3.png';
runImgs[3].src = 'img/char/run/frame-4.png';
runImgs[4].src = 'img/char/run/frame-5.png';

const jumpImgs = [
    new Image(),
    new Image(),
]
jumpImgs[0].src = 'img/char/jump/jump-up.png';
jumpImgs[1].src = 'img/char/jump/jump-fall.png';

const standImgs = [
    new Image(),
    new Image(),
]
standImgs[0].src = 'img/char/standing/frame-1.png';
standImgs[1].src = 'img/char/standing/frame-2.png';

    


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
        if (this.frameCounter > 4) {
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
        player.jumpSpeed -= 1;
        player.jumpSpeed > 0 ? player.image.src = 'img/char/jump/jump-up.png' : player.image.src = 'img/char/jump/jump-fall.png';
        ctx.drawImage(player.image, canvas.width/2 - player.image.width/2, canvas.height - player.image.height - 100 - player.currentJumpHeight);
        if (player.currentJumpHeight <= 0) {
            player.jumpSpeed = 20;
            player.currentJumpHeight = 0;
            player.activity = player.afterJumpActivity;
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
        this.afterJumpActivity = "stand";
    }

    stand() {
        if (this.activity != "jump") {
            this.activity = "stand";           
        }
    }

    run() {
        if (this.activity != "jump") {
            this.frameCounter = 0;
            this.activity = "run";
        }

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
    if (e.keyCode === 32 ) {
        player.afterJumpActivity = player.activity;
        player.jump();
    }
    if (e.keyCode === 39 ) player.run();
    if (e.keyCode === 39 && player.activity === "jump") player.afterJumpActivity = "run"; 
});
window.addEventListener('keyup', e => {
    if (e.keyCode === 39 ) player.stand();
    if (e.keyCode === 39 && player.activity === "jump") player.afterJumpActivity = "stand"; 
});

window.addEventListener('load', animate);