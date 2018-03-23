'use strict';
const TAMPERE_LAT = 61.4922779;
const TAMPERE_LON = 23.7608524;
const INIT_ZOOM = 13.21;
const UPDATE_FREQ = 1000;

let mapDivElem = document.getElementById("mapholder");
let busDataSource = "http://lissu-api.herokuapp.com/";

let myMap;
let geocoder = new google.maps.Geocoder();



showMap();
getJSONData();


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
		  });
		}
	  )
	  .catch(function(err) {
		display_status('Fetch Error :' + err);
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

}










function display_status(messagetoshow) {
  let st_line = document.getElementById("status_line");
  st_line.firstChild.nodeValue = messagetoshow;

}
