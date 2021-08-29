
let canvas = document.getElementById("can");
let ctx =canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height-30;

let dx =2;
let dy =-2;

let ballRadius =10;

let paddleHeight =10;
let paddleWidth = 75;
let paddleX= (canvas.width-paddleWidth)/2

let rightPressed = false;
let leftPressed = false;

let score = 0;

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight =20;
let brickPadding =10;
let brickOffsetTop =30;
let brickOffsetLeft =30;

let brick =[];

for(let c =0;c<brickColumnCount; c++){
    brick[c]=[];
    for(var r=0;r<brickRowCount;r++){
        brick[c][r] = {x:0,y:0,status:1};
    }
}

function collisionDetection(){
    for(let c =0;c<brickColumnCount; c++){
        for(var r=0;r<brickRowCount;r++){
           let b=brick[c][r];

           if(b.status ==1){
                if(x>b.x && x<b.x + brickWidth && y > b.y && y< b.y + brickHeight){
                    dy = -dy;
                    b.status =0;
                    score=score+512;

                    if(score/512 == brickRowCount * brickColumnCount){
                        alert("You Win");
                        document.location.reload();
                    }
    
                }
           }

           
        }
    } 
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("score:"+score,8,20);
}


function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,10,0,Math.PI*2,false);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for (let c=0; c<brickColumnCount; c++){
        for(var r=0;r<brickRowCount;r++){

            if(brick[c][r].status ==1){
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                brick[c][r].x =brickX;
                brick[c][r].y =brickY;
    
                ctx.beginPath();
                ctx.rect(brickX,brickY,brickWidth,brickHeight);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.closePath();
            }


        }
    }
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height -paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();

    if(y+dy >canvas.height - ballRadius){

       


    }

    if( y+ dy <ballRadius){
        dy = -dy;
    } else if(y + dy > canvas.height -ballRadius){

        if(x > paddleX && x < paddleX + paddleWidth+10){
            if(y = y-paddleHeight){
                dy = -dy
            }
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
        
        
        
    }

    if(x+dx>canvas.width-ballRadius | x+ dx <ballRadius){
        dx = -dx;
    }
  


    if(rightPressed && paddleX<canvas.width-paddleWidth){
        paddleX +=7;
    }
    else if(leftPressed && paddleX>0){
        paddleX -=7;
    }

    x += dx;
    y += dy;
}


document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyupHandler,false);

function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed =true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed =true;
    }
}

function keyupHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed =false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed =false;
    }  
}

let interval = setInterval(draw,10);

