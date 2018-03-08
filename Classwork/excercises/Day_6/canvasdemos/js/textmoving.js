
let backgroundColour = "#cccccc";
let button1Elem = document.getElementById("filledText");
let button2Elem = document.getElementById("emptyText");
//element containing the text to display
let txtfld = document.getElementById("textField");

button1Elem.addEventListener('click',startTextMove);
button2Elem.addEventListener('click',stopTextMove);

let canvas = document.getElementById("cv");
let ctx = canvas.getContext("2d");
// variables to control moving text
let textX = 20;
let textY = 300;
let speed = 50;
let moveTimer;  // reference to setInterval object
let time = 0;   //stores currect time

const MOVEINTERVAL = 10;

//set the initial background colour to black
clearCanvasToColour(backgroundColour);

//draw the initial text
drawText();

function clearCanvasToColour(c)
{
	ctx.fillStyle = c;
	ctx.fillRect(0,0,canvas.width,canvas.height);
}

function startTextMove()
{ 
	time = Date.now();
	moveTimer = window.setInterval(drawMovingText,MOVEINTERVAL);
}
function stopTextMove()
 {
	 window.clearInterval(moveTimer);
 }
 
function drawMovingText()
{
	let elapsed_time = (Date.now() - time)/1000;
	textX += speed * elapsed_time;
	if(textX > canvas.width){
		//reset the move when the X coordinate goes beyond the right hand edge
		textX = 0;
	}	
	//
	drawText();
	displayStatus("textX = " + textX); 
	//update time of this update
	time = Date.now();
}
function drawText()
{
	// clear the canvas to the background colour
	clearCanvasToColour(backgroundColour);
	
	// set the drawing parameters
	ctx.strokeStyle = "#CC0000";
	ctx.lineWidth = 2;
	ctx.font = "48px Verdana";	
	
	// draw the text at current location in textX and textY
	ctx.strokeText(txtfld.value,textX,textY);
}

function displayStatus(messagetoshow)
{
	let stLine = document.getElementById("status_line");
	stLine.firstChild.nodeValue = messagetoshow;

}