let canvasElem = document.getElementById("canvas");
let ctx = canvasElem.getContext("2d");

let ballMoving = true;
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

let paddleSprite = {
	x: 200,
	y: 360,
	width: 80,
	height: 15,
	speed: 200,
	colour: "#cccc00"
};

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



function updateGameState(secs)
{
  let minPermissableXvalue = 0;
  let maxPermissableXvalue = canvasElem.width - paddleSprite.width;

	if("ArrowLeft" in keysDown)
	{
	  // move paddle left if there is space to do so
    if(paddleSprite.x > minPermissableXvalue){
      paddleSprite.x -= (paddleSprite.speed * secs);
    }
	}

	if("ArrowRight" in keysDown)
	{
		// move paddle right if there is space to do so
    if(paddleSprite.x < maxPermissableXvalue){
      paddleSprite.x += (paddleSprite.speed * secs);
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

		// check if ball outside bottom of game area
    if(ballSprite.y > canvasElem.height){
      // set ballMoving = false if ball outside the game area
      ballMoving = false;
    }
	}
}

function renderGame()
{
	// draw the background with a solid colour
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvasElem.width, canvasElem.height);
	// draw the paddle sprite
  ctx.fillStyle = paddleSprite.colour;
  ctx.fillRect(paddleSprite.x, paddleSprite.y, paddleSprite.width, paddleSprite.height);
	// draw the ball sprite
  ctx.fillStyle = ballSprite.colour;
  ctx.fillRect(ballSprite.x, ballSprite.y, ballSprite.width, ballSprite.height);

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
