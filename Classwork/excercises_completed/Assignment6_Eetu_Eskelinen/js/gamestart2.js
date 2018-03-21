let canvasElem = document.getElementById("canvas");
let ctx = canvasElem.getContext("2d");

let ballMoving = true;
let lives = 3;
let time= Date.now();
let keysDown = {};

window.addEventListener("keydown",function(e){
	// add code
  keysDown[e.key] = true;
});

window.addEventListener("keyup",function(e){
	//add code
  delete keysDown[e.key];
});

// let ballSprite = {
// 	x: 160,
// 	y: 200,
// 	width: 20,
// 	height: 20,
// 	xSpeed: 100,
// 	ySpeed: -100,
// 	colour: "#cc0000"
// };

/*let paddleSprite = {
	x: 200,
	y: 360,
	width: 80,
	height: 15,
	speed: 200,
	colour: "#cccc00"
};*/

class Sprite{
  constructor(x,y,width,height,xSpeed,ySpeed,colour){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.colour = colour;
    this.isVisible = true;
  }
}



let ballSprite = new Sprite(160,200,20,20,120,-100,"#cc0000");
let paddleSprite = new Sprite(200,360,80,15,200,0,"#cccc00");

let brickAmount = 10;
let brickRowAmount = 3;
let bricks = [];

for(c=0; c<brickAmount; c++){
  bricks[c] = [];
  for(r=0; r<brickRowAmount; r++)
  {
    bricks[c][r] = new Sprite(0,0,64,15,0,0,"#ffffff");
  }
}

/*for (i = 0; i < brickAmount; i++) {
  bricks[i] = new Sprite((i*64),0,64,15,0,0,"#ffffff");
} */

//bricksAmount = bricks.length;


function updateGameState(secs)
{
  let minPermissableXvalue = 0;
  let maxPermissableXvalue = canvasElem.width - paddleSprite.width;

	if("ArrowLeft" in keysDown)
	{
	  // move paddle left if there is space to do so
    if(paddleSprite.x > minPermissableXvalue){
      paddleSprite.x -= (paddleSprite.xSpeed * secs);
    }
	}

	if("ArrowRight" in keysDown)
	{
		// move paddle right if there is space to do so
    if(paddleSprite.x < maxPermissableXvalue){
      paddleSprite.x += (paddleSprite.xSpeed * secs);
    }
	}

	if(ballMoving){
		//update ball position
    ballSprite.x += ballSprite.xSpeed * secs;
    ballSprite.y += ballSprite.ySpeed * secs;

		//check collide with left wall
    if(ballSprite.x < 0){
      ballSprite.xSpeed *= -1;
    }
		// check collide with right wall
    if((ballSprite.x + ballSprite.width) > canvasElem.width){
      ballSprite.xSpeed *= -1;
    }

		// check collide with top
    if(ballSprite.y < 0){
      ballSprite.ySpeed *= -1;
    }
		// check collide with paddle
    if((ballSprite.y + paddleSprite.height > paddleSprite.y ) && (ballSprite.x >= paddleSprite.x) && (ballSprite.x <= (paddleSprite.x + paddleSprite.width))){
      ballSprite.ySpeed *= -1;
    }
    //check collision with bricks
    for(i = 0; i < bricks.length; i++){
      //
    if ((ballSprite.y < bricks[i].y + bricks[i].height) && (ballSprite.x >= bricks[i].x) && (ballSprite.x <= (bricks[i].x + bricks[i].width))){
      ballSprite.ySpeed *= -1;
      bricks[i].isVisible = false;
      bricksAmount--;
      display_status("Bricks left: " + bricksAmount);
    }
    }

		// check if ball outside bottom of game area
    if(ballSprite.y > canvasElem.height){
      // set ballMoving = false if ball outside the game area
      ballMoving = false;
      //reduce lives by one
      lives--;
      //check if there are remaining lives. if not, display game over. if there are, display the remaining lives and reset the ball.
      if(lives <= 0)
      {
        display_status("Game over, you lost all of your lives.");
      } else {
        display_status("You lost a life. " + lives + " lives remaining.");
        resetBallPos();
      }
    }
	}
}
function resetBallPos(){
  ballSprite.ySpeed *= -1;
  ballSprite.x = 160;
  ballSprite.y = 200;
  ballMoving = true;
}

function renderGame()
{
	// draw the background with a solid colour
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvasElem.width, canvasElem.height);
  //draw the boxes
  drawBricks();
	// draw the paddle sprite
  ctx.fillStyle = paddleSprite.colour;
  ctx.fillRect(paddleSprite.x, paddleSprite.y, paddleSprite.width, paddleSprite.height);
	// draw the ball sprite
  ctx.fillStyle = ballSprite.colour;
  ctx.fillRect(ballSprite.x, ballSprite.y, ballSprite.width, ballSprite.height);

}
function drawBricks(){
  for(c=0; c<brickAmount; c++){
    for(r=0; r<brickRowAmount; r++){
      var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                  var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                  bricks[c][r].x = brickX;
                  bricks[c][r].y = brickY;
                  ctx.beginPath();
                  ctx.rect(brickX, brickY, brickWidth, brickHeight);
                  ctx.fillStyle = "#0095DD";
                  ctx.fill();
                  ctx.closePath();
    }
  }
}
function run()
{
	updateGameState((Date.now() - time)/1000);
	renderGame();
	time = Date.now();
}

 setInterval(run,10);

function display_status(messagetoshow){
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;

}
