
//set up referecnes to document objects
let canvasElem = document.getElementById("cv");
let graphicsContext = canvasElem.getContext("2d");
let drawingMode = false;

let button1Elem = document.getElementById("greenButton");
let button2Elem = document.getElementById("redButton");
let button3Elem = document.getElementById("blueButton");
let clearElem = document.getElementById("clearButton");
let lineSlider = document.getElementById("rangeSlider");

// set default line drawing parameters
graphicsContext.strokeStyle = "green";
graphicsContext.lineWidth = "3";

let e = window.event;

button1Elem.addEventListener("click", function(){
	changeColour("green");
});
button2Elem.addEventListener("click", function(){
	changeColour("red");
});
button3Elem.addEventListener("click", function(){
	changeColour("blue");
});
lineSlider.addEventListener("change", function(){
	graphicsContext.lineWidth = lineSlider.value;
});

clearElem.addEventListener("click", function(){
	graphicsContext.clearRect(0, 0, canvasElem.width, canvasElem.height);
})

function display_status(messagetoshow)
{
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;

}

function changeColour(lineColour)
{
	graphicsContext.strokeStyle = lineColour;
}

canvasElem.addEventListener("mousemove",function (e){
	if(drawingMode){
		graphicsContext.lineTo(e.offsetX, e.offsetY);
		graphicsContext.stroke();
	}

							});
canvasElem.addEventListener("mousedown", function (e){
	drawingMode = true;
	graphicsContext.beginPath();
	graphicsContext.moveTo(e.offsetX, e.offsetY);

							});
canvasElem.addEventListener("mouseup", function (e){
		drawingMode = false;
							});
