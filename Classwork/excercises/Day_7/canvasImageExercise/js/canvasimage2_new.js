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
//maps objects
let mapElem = document.getElementById("mapholder");

//get references to button objects
let showButtonElem = document.getElementById("showroute");
let clearButtonElem = document.getElementById("clearroute");
let showAllButtonElem = document.getElementById("showalllocations");

// add button event listeners
showButtonElem.addEventListener('click', function(){showRoute(kajaaniPlaces)});
clearButtonElem.addEventListener('click',clearCanvasToMap);
showAllButtonElem.addEventListener('click', function(){showAllPlaces(kajaaniPlaces)});

//get references to select objects
let start = document.getElementById("startplace");
let end = document.getElementById("endplace");
let canvas = document.getElementById("cv");

//declare variables
//let ctx = canvas.getContext("2d");
let map = new Image();
let marker = new Image();
//set Image object src property to image filename
//map.src = "images/tampereCentre.png";
map.src = "images/kajaani.png";
marker.src = "images/map_marker32x32.png";
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
tamperePlaces[5] = new Place("yliopisto","Tampere University",626,467);

let kajaaniPlaces = new Array();

kajaaniPlaces[0] = new Place("linnanrauniot","Kajaani Castle Ruins",64.2292511,27.7305087);
kajaaniPlaces[1] = new Place("kauppakatu", "Kauppakatu", 64.2252801,27.7304575);
kajaaniPlaces[2] = new Place("keskussairaala", "Kainuu Central Hospital",64.2145361,27.7266107);
kajaaniPlaces[3] = new Place("kaupunginlampi", "Kajaani City Pond", 64.2278237,27.7030033);
kajaaniPlaces[4] = new Place("ammattikorkeakoulu", "Kajaani UAS", 64.2150652,27.7083639);
kajaaniPlaces[5] = new Place("rautatieasema", "Railway Station", 64.2200876,27.7367553);

//create circle objects
//let startCircle = new Circle(ctx,0,0,CIRCLERADIUS,false,CIRCLETHICKNESS,"#CC0000");
//let endCircle = new Circle(ctx,0,0,CIRCLERADIUS,false,CIRCLETHICKNESS,"#0000CC");
//create line object
//let routeLine = new Line(ctx,0,0,0,0,LINETHICKNESS,"#CCCC00");

//populate the HTML select element with place names
loadPlaceNames(kajaaniPlaces);

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
	//ctx.drawImage(map,0,0,canvas.width, canvas.height);
}

function showRoute(places){
	//Clear the map when you draw a new route
	//ctx.drawImage(map,0,0,canvas.width, canvas.height);

	// ****EXERCISE 1  ******
	// get the current value of the start and end select elements
	let s = parseInt(start.value);
	let e = parseInt(end.value);
	// look up map coordinates and correct to canvas coordinates
	let startx = places[s].xloc * (canvas.width/map.width);
	let starty = places[s].yloc * (canvas.height/map.height);

	let endx = places[e].xloc * (canvas.width/map.width);
	let endy = places[e].yloc * (canvas.height/map.height);
	//show string containing the route using display_status()
	display_status("Current route is from (" + startx + ", " + starty + "), (" + endx + ", " + endy + ")." );

	//draw circles
	startCircle.setPosition(startx, starty);
	endCircle.setPosition(endx, endy);
	startCircle.draw();
	endCircle.draw();
	//draw line
	routeLine.setPositions(startx, starty, endx, endy);
	routeLine.draw();
}

function showAllPlaces(places){
	for (i = 0; i < places.length; i++) {
    //ctx.drawImage(marker, (places[i].xloc * (canvas.width/map.width)) - (marker.width/2), (places[i].yloc * (canvas.height/map.height)) - (marker.height));
}
}

function clearCanvasToMap(){
	//ctx.drawImage(map,0,0,canvas.width, canvas.height);
}

function display_status(messagetoshow){
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;
}
