
const MAINLAT = 61.5032897;
const MAINLON = 23.8090061;
const MPLAT = 61.5064004;
const MPLON = 23.6493113;

let mapDivElem = document.getElementById("mapholder");
let longf = document.getElementById("longField");
let latf = document.getElementById("latField");
let zoomf = document.getElementById("zoomField");
let buttonElem = document.getElementById("showMapButton");
let button2Elem = document.getElementById("showMediaPolisButton");
let button3Elem = document.getElementById("showMainCampusButton");

buttonElem.addEventListener('click',showGoogleMap);
button2Elem.addEventListener('click',showMediapolisOnMap);
button3Elem.addEventListener('click',showMainCampusOnMap);

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
	myMap = new google.maps.Map(mapDivElem,mapOptions);

    display_status(" Position: " + lat_long);
}

function showMediapolisOnMap(){
	let mediapolisLocation = new google.maps.LatLng(MPLAT,MPLON);

	let myMarker = new google.maps.Marker({
										position:mediapolisLocation,
										map:myMap,
										title:"TAMK at Mediapolis",
										});

	display_status("Mediapolis position: " + mediapolisLocation);
}

function showMainCampusOnMap(){
	let maincampusLocation = new google.maps.LatLng(MAINLAT,MAINLON);

	let myMarker = new google.maps.Marker({
										position:maincampusLocation,
										map:myMap,
										title:"TAMK Main Campus",
										});

	display_status("Main Campus position: " + maincampusLocation);
}

function display_status(messagetoshow)
{
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;
}
