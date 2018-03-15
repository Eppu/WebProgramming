let mapDiv = document.getElementById("mapholder");
let longf = document.getElementById("longField");
let latf = document.getElementById("latField");
let zoomf = document.getElementById("zoomField");
let buttonElem = document.getElementById("showMapButton");

let canvas = document.getElementById("cv");
let ctx = canvas.getContext("2d");
let map = new Image();

buttonElem.addEventListener('click',showCanvasImageOnly);
map.addEventListener('load',mapImageLoaded,false);
	
function mapImageLoaded()
{
	ctx.drawImage(map,0,0,canvas.width,canvas.height);
	display_status("image load event received");
}
function showCanvasImageOnly()
{
	
	let lon = parseFloat(longf.value);
	let lat = parseFloat(latf.value);
	let zm = parseInt(zoomf.value);
		
	let lat_long = lat + "," + lon;

	let map_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat_long + "&zoom="+zm+"&size=640x480";	
	map.src = map_url;
  	
}


function display_status(messagetoshow)
{
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;
}