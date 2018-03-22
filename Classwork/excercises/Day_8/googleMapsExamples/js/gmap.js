
const MPLAT = 61.5064004; 
const MPLON = 23.6493113;

let mapDivElem = document.getElementById("mapholder");
let longf = document.getElementById("longField");
let latf = document.getElementById("latField");
let zoomf = document.getElementById("zoomField");
let buttonElem = document.getElementById("showMapButton");

buttonElem.addEventListener('click',showGoogleMap);

function showGoogleMap()
{
	display_status("fetch map.. ");
	//let lon = parseFloat(longf.value);
	//let lat = parseFloat(latf.value);
	let lat = MPLAT;
	let lon = MPLON;
	let zm = parseInt(zoomf.value);
		
	let lat_long = new google.maps.LatLng(lat,lon);
			
	let mapOptions = {
						center:lat_long,
						zoom:zm,
						mapTypeId:google.maps.MapTypeId.ROADMAP,
						mapTypeControl:true,
						navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},
					};
	let myMap = new google.maps.Map(mapDivElem,mapOptions);
	
    display_status("position: " + lat_long);	
}


function display_status(messagetoshow)
{
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;
}