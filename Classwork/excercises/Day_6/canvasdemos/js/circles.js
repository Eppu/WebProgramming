
let button1Elem = document.getElementById("filledCircle");
let button2Elem = document.getElementById("emptyCircle");
button1Elem.addEventListener('click',drawFilledCircle);
button2Elem.addEventListener('click',drawCircle);

let canvas = document.getElementById("cv");
let ctx = canvas.getContext("2d");

//set the initial background colour to black
clearCanvasToColour("#000000");

function clearCanvasToColour(c)
{
	ctx.fillStyle = c;
	ctx.fillRect(0,0,canvas.width,canvas.height);
}
function drawFilledCircle()
{
// draw the background
	clearCanvasToColour("#000000");
// draw the sprite
	ctx.fillStyle = "#CC0000";

	ctx.beginPath();
	ctx.arc(200,300,40,0,2 * Math.PI);
	ctx.fill();
}

function drawCircle()
{
// draw the background
	clearCanvasToColour("#000000");
// draw the sprite
	ctx.strokeStyle = "#CC0000";
	ctx.lineWidth = 5;

	ctx.beginPath();
	ctx.arc(300,300,40,0,2*Math.PI);
	ctx.stroke();
}
