
let button1Elem = document.getElementById("filledRect");
let button2Elem = document.getElementById("emptyRect");
button1Elem.addEventListener('click',drawFilledRect);
button2Elem.addEventListener('click',drawRect);

let canvas = document.getElementById("cv");
let ctx = canvas.getContext("2d");

//set the initial background colour to black
clearCanvasToColour("#000000");

function clearCanvasToColour(c)
{
	ctx.fillStyle = c;
	ctx.fillRect(0,0,canvas.width,canvas.height);
}
function drawFilledRect()
{
	// clear the canvas to the background colour
	clearCanvasToColour("#000000");

	ctx.fillStyle = "#CC0000";
	// draw the shape
	ctx.fillRect(300,300,60,30);
}

function drawRect()
{
	// clear the canvas to the background colour
	clearCanvasToColour("#000000");
	// draw the sprite
	ctx.strokeStyle = "#CC0000";
	ctx.lineWidth = 5;
	
	// draw the shape
	ctx.rect(200,300,60,30);
	ctx.stroke();
}