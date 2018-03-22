
const TAMKLAT = 61.5064004;
const TAMKLON = 23.6493113;
const PANINTERVAL = 2000;

let mapDiv = document.getElementById("mapholder");
let longf = document.getElementById("longField");
let latf = document.getElementById("latField");
let zoomf = document.getElementById("zoomField");
let buttonElem = document.getElementById("showMapButton");
let button2Elem = document.getElementById("showMeButton");

buttonElem.addEventListener('click',showGoogleMap);
button2Elem.addEventListener('click',showMyLocation);

let myMap; // to enable reference to map object to be shared across functions

function showGoogleMap()
{
	display_status("fetch map.. ");
	let lon = parseFloat(longf.value);
	let lat = parseFloat(latf.value);
	let zm = parseInt(zoomf.value);
		
	let lat_long = new google.maps.LatLng(lat,lon);
			
	let mapOptions = {
						center:lat_long,
						zoom:zm,
						mapTypeId:google.maps.MapTypeId.ROADMAP,
						mapTypeControl:false,
						navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},
					};
	myMap = new google.maps.Map(mapDiv,mapOptions);
	
    display_status(" Position: " + lat_long);	
}


function showMyLocation(){
	//first check whether geolocation is supported
	if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(showPositionMarker,showError);
	}
	else{
		display_status("Geolocation not supported by this browser ");
	}
	
}
function showPositionMarker(position){
	if(myMap){
		let lat_long = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		let myMarker = new google.maps.Marker({
							position:lat_long,
							map:myMap,
							title:"Here you are",
						});
		//wait for timeout interval and then pan the map to the marker
		window.setTimeout(function() {
				myMap.panTo(myMarker.getPosition());
			}, PANINTERVAL);
	}
}

function showError(error)
{
	let msg= "";
	switch(error.code)
	{
		case error.PERMISSION_DENIED: msg ="User denied request for geolocation"; break;
		case error.POSITION_UNAVAILABLE: msg ="Position is NOT available"; break;
		case error.TIMEOUT: msg ="Request to get user position has timed out"; break;
		case error.UNKNOWN_ERROR: msg ="Unknown error has occurred"; break;
	}
	display_status("Error: " + msg);
}
function display_status(messagetoshow)
{
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;
}