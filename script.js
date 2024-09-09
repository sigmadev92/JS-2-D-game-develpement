//Lines 2 to 9 : Setting up canvas and its properties
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

const CANVAS_W = canvas.width = 600;
const CANVAS_H = canvas.height = 600;

const spriteWidth = 575;
const spriteHeight = 523;

// Bringing in image
const playerImage = new Image();
playerImage.src = "shadow_dog.png";

let frameY = 0;
const limiter = [7,7,7,9,11,5,7,7,12,4];
let frameX=0;
let limit = 7;
let gameFrame = 0;
const staggeredFrame = 5;
let animateThis = true;
let lastButtonClicked = 1;
 
let buttons = [];
for(var i=0;i<10;i++)
    buttons.push(document.getElementById(`${i+1}`));

buttons.push(document.getElementById("stop"));

for(let i = 0;i<11;i++){
    buttons[i].addEventListener('click',()=> {
        lastButtonClicked = i+1;
    if(i==10){
        frameX = 0;
        frameY = 0;
        animateThis = false;
        return;
    }
    if(i == lastButtonClicked){
        frameX = 0;
        return;
    }
    frameY = i;
    limit = limiter[i];
    if(!animateThis){
        animateThis = true;
        animate();
    }
    });
}



function animate(){
    ctx.clearRect(0,0,CANVAS_W,CANVAS_H);
    // ctx.fillRect(x,50,100,100);
    
    ctx.drawImage(playerImage,frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight,0,0,spriteWidth,spriteHeight);
    if(gameFrame % staggeredFrame == 0){
        if(frameX < limit-1) frameX++;
        else frameX = 0;
    }
    gameFrame++;
    if(!animateThis) return;
    requestAnimationFrame(animate)
};
animate();

