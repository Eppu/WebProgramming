let canvasElem = document.getElementById("canvas");
let ctx = canvasElem.getContext("2d");

let ballMoving = true;
let time= Date.now();
let keysDown = {};
 
window.addEventListener("keydown",function(e){
	// add code
});

window.addEventListener("keyup",function(e){
	//add code
});

let ballSprite = {
	x: 160,
	y: 200,
	width: 20,
	height: 20,
	xSpeed: 100,
	ySpeed: -100,
	colour: "#cc0000"
};

let paddleSprite = {
	x: 200,
	y: 360,
	width: 80,
	height: 15,
	speed: 200,
	colour: "#cccc00"
};


function updateGameState(secs)
{
	if("ArrowLeft" in keysDown)
	{
	  // move paddle left if there is space to do so
	}
	
	if("ArrowRight" in keysDown)
	{
		// move paddle left if there is space to do so
	}
	
	if(ballMoving){
		//update ball position
		
	
		//check collide with left wall
		
		
		// check collide with right wall
		
		
		// check collide with top
		
		
		// check collide with paddle
		
		
		// check if ball outside bottom of game area
	    // set ballMoving = false if ball outside the game area
	}
}

function renderGame()
{
	// draw the background with a solid colour

	// draw the paddle sprite
	
	// draw the ball sprite
	
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