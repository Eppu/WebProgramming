const TAMPERE_LAT = 61.4922779;
const TAMPERE_LON = 23.7608524;
const INIT_ZOOM = 13.21;
const UPDATE_FREQ = 1000;

let mapDivElem = document.getElementById("mapholder");
let busDataSource = "http://lissu-api.herokuapp.com/";

let myMap;
let geocoder = new google.maps.Geocoder();
let directionsService = new google.maps.DirectionsService();
let directionsDisplay = new google.maps.DirectionsRenderer();

let tampereBuses = new Array();
let markers = new Array();
let chosenBusIds = new Array();


getJSONData();
showMap();

class Bus {
	constructor(line, displayName, xloc, yloc) {
		this.line = line;
		this.displayName = displayName;
		this.xloc = xloc;
		this.yloc = yloc;
	}
}

/* mapDivElem.addEventListener('load', function() {
	showAllBuses(tampereBuses)
}); */


function getJSONData(){
	fetch(busDataSource)
	  .then(
		function(response) {
		  if (response.status !== 200) {
			display_status('data transfer NOT complete. Status Code: ' + response.status);
			return;
		  }
		  // Examine the text in the response
		  response.json().then(function(data) {
				display_status("number of items found " + data.vehicles.length);
				//data.forEach(createDOMObject);
			  for (let i = 0; i < data.vehicles.length; i++) {
					//create new bus objects based on the json data
					tampereBuses[i] = new Bus(data.vehicles[i].line, data.vehicles[i].id, data.vehicles[i].latitude, data.vehicles[i].longitude);
					//crete new markers
				}
				showAllBuses(tampereBuses);
		  });
		}
	  )
	  .catch(function(err) {
		display_status('Fetch Error :' + err);
		console.log("Error.");
  });
}

function showMap(){
  let lat_long = new google.maps.LatLng(TAMPERE_LAT,TAMPERE_LON);

  let mapOptions = {
    center:lat_long,
    zoom: INIT_ZOOM,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    mapTypeControl:false,
    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},
  };
  myMap = new google.maps.Map(mapDivElem,mapOptions);

	  directionsDisplay.setMap(myMap);

}

function showAllBuses(buses){
	for(i = 0; i < buses.length; i++){
	currentLocation = new google.maps.LatLng(buses[i].xloc, buses[i].yloc);
	let thisMarker = new google.maps.Marker({
		position: currentLocation,
		map: myMap,
		title: buses[i].line,
	});
	markers.push(thisMarker);
}
}

// Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }




//why does this not work?
/*function showAllBuses() {
	for(i = 0; i < tampereBuses.length; i++) {
		currentLocation = new google.maps.LatLng(tampereBuses[i].xloc, tampereBuses[i].yloc);
		new google.maps.Marker({
			position: currentLocation,
			map: myMap,
			title: tampereBuses[i].displayName,
		});
	}
} */


/* function findBuses(){
	getJSONData();
	let tampereBuses = new Array();
  for (let i = 0; i < data.vehicles.length; i++) {
		tampereBuses[i] = new Bus(data.vehicles[i].line, data.vehicles[i].id, data.vehicles[i].latitude, data.vehicles[i].longitude);
		console.log(tampereBuses[i]);
	}
} */



setInterval(getJSONData, UPDATE_FREQ);

function display_status(messagetoshow) {
  let st_line = document.getElementById("status_line");
  st_line.firstChild.nodeValue = messagetoshow;

}
