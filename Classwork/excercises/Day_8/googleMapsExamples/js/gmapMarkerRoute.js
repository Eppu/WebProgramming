
const MAINLAT = 61.5032897;
const MAINLON = 23.8090061;
const MPLAT = 61.5064004; 
const MPLON = 23.6493113;
const LAUKONTLAT = 61.495019;
const LAUKONTLON = 23.7604008;


let mapDivElem = document.getElementById("mapholder");
let longf = document.getElementById("longField");
let latf = document.getElementById("latField");
let zoomf = document.getElementById("zoomField");
let buttonElem = document.getElementById("showMapButton");
//let button2Elem = document.getElementById("showMediaPolisButton");
//let button3Elem = document.getElementById("showMainCampusButton");
let button4Elem = document.getElementById("showRoute1Button");
let button5Elem = document.getElementById("showRoute2Button");
let button6Elem = document.getElementById("clearRouteButton");

buttonElem.addEventListener('click',showGoogleMap);
//button2Elem.addEventListener('click',showMediapolisOnMap);
//button3Elem.addEventListener('click',showMainCampusOnMap);
button4Elem.addEventListener('click',function(){showRouteOnMap(1)});
button5Elem.addEventListener('click',function(){showRouteOnMap(2)});
button6Elem.addEventListener('click',clearRouteOnMap);

let myMap; // to enable reference to map object to be shared across functions

let mediapolisLocation = new google.maps.LatLng(MPLAT,MPLON);
let maincampusLocation = new google.maps.LatLng(MAINLAT,MAINLON);
let laukontoriLocation = new google.maps.LatLng(LAUKONTLAT,LAUKONTLON);
let directionsService = new google.maps.DirectionsService();
let directionsDisplay = new google.maps.DirectionsRenderer();



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
	//**********  set map for  directionsRenderer service
	directionsDisplay.setMap(myMap);
	//directionsDisplay.suppressMarkers = true;
	
    display_status(" Position: " + lat_long);	
}

function showMediapolisOnMap(){
	//let mediapolisLocation = new google.maps.LatLng(MPLAT,MPLON);
	
	let myMarker = new google.maps.Marker({
										position:mediapolisLocation,
										map:myMap,
										title:"TAMK at Mediapolis",
										});
										
	display_status("Mediapolis position: " + mediapolisLocation);	
}

function showMainCampusOnMap(){
	//let maincampusLocation = new google.maps.LatLng(MAINLAT,MAINLON);
	
	let myMarker = new google.maps.Marker({
										position:maincampusLocation,
										map:myMap,
										title:"TAMK Main Campus",
										});
										
	display_status("Main Campus position: " + maincampusLocation);	
}

function showRouteOnMap(thisRoute){
	let startLocation = (thisRoute == 1)?mediapolisLocation:laukontoriLocation;
	let routeRequest = {
		origin:startLocation,
		destination:maincampusLocation,
		travelMode:'WALKING'
	};
	
	directionsService.route(routeRequest, function(result,status){
		if(status =="OK"){
			directionsDisplay.setDirections(result);
			display_status("Route found");
		}
	});
}

function clearRouteOnMap(){
	directionsDisplay.set('directions', null);
}

function display_status(messagetoshow)
{
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;
}