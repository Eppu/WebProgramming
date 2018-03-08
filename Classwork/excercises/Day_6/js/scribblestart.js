
//set up referecnes to document objects
let canvasElem = document.getElementById("cv");
let graphicsContext = canvasElem.getContext("2d");
let drawingMode = false;

let button1Elem = document.getElementById("greenButton");
let button2Elem = document.getElementById("redButton");



// set default line drawing parameters
graphicsContext.strokeStyle = "green";
graphicsContext.lineWidth = "3";

function display_status(messagetoshow)
{
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;

}

function changeColour(lineColour)
{
	
}



canvasElem.addEventListener("mousemove",function (e){

							});
canvasElem.addEventListener("mousedown", function (e){

							});
canvasElem.addEventListener("mouseup", function (e){

							});