const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const playerImage = new Image();
let date = new Date();
let lastAnimationUpdate = date.getTime();
playerImage.src = "img/char/run/frame-1.png";
let counter = 1;
let isJumping = 0;
let jumpSpeed = 20;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

function drawBottomLine() {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 100);
    ctx.lineTo(canvas.width, canvas.height - 100);
    ctx.lineWidth = 5;
    ctx.stroke();   
}

function drawPlayerRunning() {
    const changePicture = () => {
        date = new Date();
        playerImage.src = `img/char/run/frame-${counter}.png`;
        if (date.getTime() - lastAnimationUpdate > 80) {
            date = new Date();
            lastAnimationUpdate = date.getTime();
            counter < 5 ? counter++ : counter = 1;   
        }
    }
    ctx.drawImage(playerImage, canvas.width/2 - playerImage.width/2, playerY);
    changePicture();
}

function jump() {
    isJumping = 1;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBottomLine();
    drawPlayerRunning();
    if (isJumping) {
        if (jumpSpeed > 0) {
            playerImage.src = `img/char/jump/jump-up.png`;
            playerY -= jumpSpeed;
            jumpSpeed -= 1; 
            console.log(playerY);
        }
        else if (jumpSpeed <= 0) {
            isJumping = 0; 
        }
    } 
    else {
        if (playerY < canvas.height - playerImage.height - 100) {
            playerImage.src = `img/char/jump/jump-fall.png`;
            playerY += jumpSpeed;
            jumpSpeed += 1;
            console.log(playerY);
        } 
        else {
        playerY = canvas.height - playerImage.height - 100;
        jumpSpeed = 20;
        }
    }
    requestAnimationFrame(animate);
}

let playerY = canvas.height - playerImage.height - 100;

window.addEventListener('load', animate);

window.addEventListener('keydown', () => {
    jump();
});