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
        this.standingFrame = 1;
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
        // console.log("Player is standing!");
        this.date = new Date();
        console.log(this.date.getMilliseconds());
        (this.date.getMilliseconds() > 500) == 0 ? this.standingFrame = 2 : this.standingFrame = 1;
        player.image.src = `img/char/standing/frame-${this.standingFrame}.png`;
        ctx.drawImage(player.image, 300, canvas.height - player.image.height - 100);
    }

    drawPlayerRunning() {
        console.log("Player is running!");
    }

    drawPlayerJumping() {
        console.log("Player is jumping!");
        player.activity = "stand";
    }
}

class Player {
    constructor(activity, jumpSpeed, animationSpeed) {
        this.activity = activity;
        this.jumpSpeed = jumpSpeed;
        this.animationSpeed = animationSpeed;
        this.image = new Image();
        this.image.src = 'img/char/standing/frame-1.png';
    }

    stand() {
        this.activity = "stand";
    }

    run() {
        this.activity = "run";
    }

    jump() {
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

window.addEventListener('load', animate);
window.addEventListener('keydown', e => {
    if (e.keyCode === 32) player.jump();
    if (e.keyCode === 39) player.run();
});
window.addEventListener('keyup', e => {
    if (e.keyCode === 39) player.stand();
});