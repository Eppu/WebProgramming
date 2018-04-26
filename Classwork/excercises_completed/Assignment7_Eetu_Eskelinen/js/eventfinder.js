//Set up initial map coordinates
const INIT_LAT = 65.5074186;
const INIT_LON = 26.7325631;
const INIT_ZOOM = 5.75;
//declare variables, html and data references, and google maps things
let panelElem = document.getElementById("container");
let dataSource1 = "data/eventdata.json";
let mapDivElem = document.getElementById("mapholder");
//these will store the google map and the user position
let myMap;
let pos;
//these are needed for the google map to work and show directions correctly
let geocoder = new google.maps.Geocoder();
let directionsService = new google.maps.DirectionsService();
let directionsDisplay = new google.maps.DirectionsRenderer();
let infoWindow = new google.maps.InfoWindow;

//show the google map on page load
showMap();
//fetch json data and run createDOMOBject as many times as needed
fetch(dataSource1)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    for (i = 0; i < myJson.length; i++) {
      createDOMObject(myJson[i]);
      drawPositions(myJson[i]);
    }
  });

//create dom objects
function createDOMObject(item) {
  let newItem = document.createElement("div");
  newItem.setAttribute("class", "event");

  let content = "";

  content += "<div class='recordtext'>";
  content += "<p>";
  content += "<span class='title'>Name: </span> " + item.name + "</br>";
  content += "<span class='title'>Start Date: </span> " + item.startDate + "</br>";
  content += "<span class='title'>End Date: </span> " + item.endDate + "</br>";
  content += "<span class='title'>Address: </span>" + item.address + "</br>";
  content += "<span class='title'>Postcode: </span>" + item.postcode + "</br>";
  content += "<span class='title'>City: </span>" + item.city + "</br>";
  content += "<span class='title'>Homepage: </span><a href = '" + item.homepage + "'>" + item.homepage + " </a></br>";
  content += "<span class='title'>Email: </span>" + item.email + "</br>";
  content += "</p>";
  content += "</div>";
  content += "<div class='recordimage'>";
  content += "<img class='pics' src ='images/" + item.picture + " '/>";
  content += "</div>";

  newItem.innerHTML = content;
  panelElem.appendChild(newItem);
}
//show map function
function showMap() {
  let lat_long = new google.maps.LatLng(INIT_LAT, INIT_LON);
  // set up map options
  let mapOptions = {
    center: lat_long,
    zoom: INIT_ZOOM,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL
    },
  };
  myMap = new google.maps.Map(mapDivElem, mapOptions);
  //set up directions display
  directionsDisplay.setMap(myMap);
  //check for users geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      //if location is found, display a message saying so
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(myMap);
      myMap.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, myMap.getCenter());
    });
  } else {
    // browser doesn't support Geolocation
    handleLocationError(false, infoWindow, myMap.getCenter());
  }
}
// Send the user an error message if the geolocating failed, or if the browser doesn't support geolocation.
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(myMap);
}

//draw markers at event locations
function drawPositions(place) {
  let address = place.address + ", " + place.postcode + ", " + place.city;
  geocoder.geocode({
      "address": address
    },
    function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        let addressLocation = results[0].geometry.location;
        //this is a var instead of a let, so that we can use it later
        var marker = new google.maps.Marker({
          position: addressLocation,
          map: myMap,
          title: place.name,
        });
      }
      //display the event name and the address of the clicked marker
      let placeInfo = new google.maps.InfoWindow({
        content: place.name + ", " + address
      });
      google.maps.event.addListener(marker, 'click', function() {
        placeInfo.open(myMap, marker);
      });

      //display a driving route from the users position to the clicked marker
      marker.addListener('click', function() {
        directionsService.route({
          origin: pos,
          destination: address,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      });
    }
  )
}