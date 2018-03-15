const CIRCLETHICKNESS = 10;
const CIRCLERADIUS = 10;
const LINETHICKNESS = 10;

class Place{
	constructor(name,displayName,xloc, yloc){
		this.name = name;
		this.displayName = displayName;
		this.xloc = xloc;
		this.yloc = yloc;
	}	
}

class Circle{
	constructor(context,xPos,yPos,radius,filled,lineWidth,colour){
		this.context = context;
		this.xPos = xPos;
		this.yPos = yPos;
		this.radius = radius;
		this.filled = filled;
		this.lineWidth = lineWidth;
		this.colour = colour;
	}
	draw(){
		if(this.filled){
			this.context.fillStyle = this.colour;
		} else{
			this.context.strokeStyle = this.colour;
			this.context.lineWidth = this.lineWidth;
		}
		this.context.beginPath();
		this.context.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI);
		if(this.filled){
			this.context.fill();
		}else{
			this.context.stroke();
		}
	}
	setPosition(xPos,yPos){
		this.xPos = xPos;
		this.yPos = yPos;
	}
}
class Line{
	constructor(context,xStart,yStart,xEnd,yEnd,lineWidth,colour){
		this.context = context;
		this.xStart = xStart;
		this.yStart = yStart;
		this.xEnd = xEnd;
		this.yEnd = yEnd;
		this.lineWidth = lineWidth;
		this.colour = colour;
	}
	draw(){
		this.context.strokeStyle = this.colour;
		this.context.lineWidth = this.lineWidth;
		this.context.beginPath();
		this.context.moveTo(this.xStart,this.yStart);
		this.context.lineTo(this.xEnd,this.yEnd);
		this.context.stroke();
		
	}
	setPositions(xStart,yStart,xEnd,yEnd){
		this.xStart = xStart;
		this.yStart = yStart;
		this.xEnd = xEnd;
		this.yEnd = yEnd;
	}
}
//get references to button objects
let showButtonElem = document.getElementById("showroute");
let clearButtonElem = document.getElementById("clearroute");

// add button event listeners
showButtonElem.addEventListener('click', function(){showRoute(tamperePlaces)});
clearButtonElem.addEventListener('click',clearCanvasToMap);

//get references to select objects
let start = document.getElementById("startplace");
let end = document.getElementById("endplace");
let canvas = document.getElementById("cv");

//declare variables 
let ctx = canvas.getContext("2d");
let map = new Image();
//set Image object src property to image filename
map.src = "images/tampereCentre.png";
//map.src = "images/citylogo.png";

// wait until load event triggered
map.addEventListener("load",mapImageLoaded);


//create array of place objects
let tamperePlaces = new Array(5);

tamperePlaces[0] = new Place("elokuvateatteri","Plevna Cinema",160,103);
tamperePlaces[1] = new Place("keskustori","Keskustori",226,251);
tamperePlaces[2] = new Place("kauppahalli","Market Hall",166,315);
tamperePlaces[3] = new Place("rautatieasema","Railway Station",495,247);
tamperePlaces[4] = new Place("tammelantori","Tammelantori",636,80);

//create circle objects
let startCircle = new Circle(ctx,0,0,CIRCLERADIUS,false,CIRCLETHICKNESS,"#CC0000");
let endCircle = new Circle(ctx,0,0,CIRCLERADIUS,false,CIRCLETHICKNESS,"#0000CC");
//create line object
let routeLine = new Line(ctx,0,0,0,0,LINETHICKNESS,"#CCCC00");

//populate the HTML select element with place names
loadPlaceNames(tamperePlaces);

function loadPlaceNames(places){
	let nameToShowNode;
	let optionNode,optionNodeCopy;
	
	// loop through places array, create <option> element and append to start and end <select> elements
	for (let count = 0; count < places.length; count++){
		// create option node
		nameToShowNode = document.createTextNode(places[count].displayName);
		optionNode = document.createElement("option");
		optionNode.appendChild(nameToShowNode);
		optionNode.setAttribute("value",count);
		// create a copy of the node 
		optionNodeCopy = optionNode.cloneNode(true);
		// add the node and the clone to two <select> elements
		start.appendChild(optionNode);
		end.appendChild(optionNodeCopy);
	}
}

function mapImageLoaded(){
	ctx.drawImage(map,0,0,canvas.width, canvas.height);
}

function showRoute(places){
	// ****EXERCISE 1  ******
	// get the current value of the start and end select elements	
	
	// look up map coordinates and correct to canvas coordinates
	
	//show string containing the route using display_status()
	
	
	//draw circles
	
	//draw line
	
	
}

function clearCanvasToMap(){
	ctx.drawImage(map,0,0,canvas.width, canvas.height);
}

function display_status(messagetoshow){
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;
}