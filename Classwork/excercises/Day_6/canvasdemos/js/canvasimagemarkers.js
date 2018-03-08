
let showButton = document.getElementById("showRoute");
let clearButton = document.getElementById("clearRoute");
let showAllButton = document.getElementById("showAll");
showButton.addEventListener('click', show);
clearButton.addEventListener('click',clearCanvasToMap);
showAllButton.addEventListener('click',showAllLocations);

let start = document.getElementById("startplace");
let end = document.getElementById("endplace");
let canvas = document.getElementById("cv");
let ctx = canvas.getContext("2d");

let map = new Image();
let marker = new Image();

let route = "";
let markerRadius = 30;

class Place{
	constructor(name,displayName,xloc, yloc){
		this.name = name;
		this.displayName = displayName;
		this.xloc = xloc;
		this.yloc = yloc;
	}
}

let places = new Array(5);
places[0] = new Place("tammelantori","Tammelantori",636,80);
places[1] = new Place("railway","Railway Station",495,247);
places[2] = new Place("cinema","Plevna Cinema",160,103);
places[3] = new Place("keskustori","Keskustori",226,251);
places[4] = new Place("kauppahalli","Market Hall",166,315);

map.src = "images/tampereCentre.png";
map.addEventListener("load",mapImageLoaded,false);

marker.src = "images/map_marker32x32.png"
// no listener to check when this is loaded, as the file is very small

//populate start and end lists with place names
loadPlaceNames();

function loadPlaceNames(){
	let nameList = [];
	for(let i  = 0; i< places.length; i++){
		nameList.push(places[i].displayName);
	}
	// sort the list alphabetically
	nameList.sort();
	
	//add each item to the start and the end list
	for(let i  = 0; i< nameList.length; i++){
		addNodeToList(start,nameList[i]);
		addNodeToList(end,nameList[i]);
	}
	// this function is inside the loadPlaceNames function
	function addNodeToList(elem,nameValue){
		let nameTxt = document.createTextNode(nameValue);
		let optionNode = document.createElement("option");
		let valueString = lookUpValueString(nameValue);
		optionNode.appendChild(nameTxt);
		optionNode.setAttribute("value",valueString);
		elem.appendChild(optionNode);
	}
	// this function is inside the loadPlaceNames function
	function lookUpValueString(val){
		for(let i = 0; i < places.length;i++){
			if(val == places[i].displayName)
				return places[i].name;
		}
	// otherwise return undefined	
	}
}

function mapImageLoaded()
{
	ctx.drawImage(map,0,0,canvas.width,canvas.height);
}

function clearCanvasToMap()
{
	ctx.drawImage(map,0,0,canvas.width,canvas.height);
	display_status("Route");
}
function show()
{
	
	// look up map coordinates and correct to canvas coordinates
	let s = lookUp(start.value);
	let e = lookUp(end.value);
	let startx = places[s].xloc * (canvas.width/map.width);
	let starty = places[s].yloc * (canvas.height/map.height);
	let endx = places[e].xloc * (canvas.width/map.width);
	let endy = places[e].yloc * (canvas.height/map.height);
	display_status("from " + places[s].displayName + "  to " + places[e].displayName);
	
	ctx.strokeStyle = "#CC0000";
	ctx.lineWidth = 10;
	// draw start circle
	ctx.beginPath();
	ctx.arc(startx,starty,markerRadius,0,2*Math.PI);
	ctx.stroke();
	
	//draw end circle
	ctx.strokeStyle = "#00CCCC";
	ctx.beginPath();
	ctx.arc(endx,endy,markerRadius,0,2*Math.PI);
	ctx.stroke();
	
	// draw line
	ctx.strokeStyle = "#00CC00";
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(startx,starty);
	ctx.lineTo(endx,endy);
	ctx.stroke();
}
 function showAllLocations(){
	for (let i = 0; i < places.length; i++){
		let x = (places[i].xloc - (marker.width/2)) * (canvas.width/map.width);
		let y = (places[i].yloc - marker.height) * (canvas.height/map.height);
		ctx.drawImage(marker, x,y);	
	}

}
 
function display_status(messagetoshow)
{
let st_line = document.getElementById("status_line");
st_line.firstChild.nodeValue = messagetoshow;
}

function lookUp(val)
{
	for(let i = 0; i < places.length;i++)
	 if(val == places[i].name)
		return i;
	// otherwise return undefined	
}

