
let backgroundColour = "#cccccc";
let button1Elem = document.getElementById("filledText");
let button2Elem = document.getElementById("emptyText");
//element containing the text to display
let txtfld = document.getElementById("textField");

button1Elem.addEventListener('click',drawFilledText);
button2Elem.addEventListener('click',drawText);

let canvas = document.getElementById("cv");
let ctx = canvas.getContext("2d");

//set the initial background colour to black
clearCanvasToColour(backgroundColour);

function clearCanvasToColour(c)
{
	ctx.fillStyle = c;
	ctx.fillRect(0,0,canvas.width,canvas.height);
}
function drawFilledText()
{
	// clear the canvas to the background colour
	clearCanvasToColour(backgroundColour);
	
	// set the drawing parameters
	ctx.fillStyle = "#CC0000";	
	ctx.font = "36px Verdana";
	
	// draw the filled text
	ctx.fillText(txtfld.value,200,300);
}

function drawText()
{
	// clear the canvas to the background colour
	clearCanvasToColour(backgroundColour);
	
	// set the drawing parameters
	ctx.strokeStyle = "#CC0000";
	ctx.lineWidth = 2;
	ctx.font = "48px Verdana";	
	
	// draw the text
	ctx.strokeText(txtfld.value,300,300);
}