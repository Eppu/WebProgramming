const TAMPERE_LAT = 61.4922779;
const TAMPERE_LON = 23.7608524;
const INIT_ZOOM = 12;

let panelElem = document.getElementById("container");
let dataSource1 = "data/hoteldata2.json";
let mapDivElem = document.getElementById("mapholder");

let myMap;

let geocoder = new google.maps.Geocoder();
let directionsService = new google.maps.DirectionsService();
let directionsDisplay = new google.maps.DirectionsRenderer();


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
  newItem.setAttribute("class", "hotelrecord");

  let content = "";

  content += "<div class='recordtext'>";
  content += "<p>";
  content += "<span class='title'>Name: </span> " + item.name + "</br>";
  content += "<span class='title'>Address: </span>" + item.address + "</br>";
  content += "<span class='title'>Postcode: </span>" + item.postcode + "</br>";
  content += "<span class='title'>City: </span>" + item.city + "</br>";
  content += "<span class='title'>Star rating: </span>" + item.starRating + "</br>";
  content += "<span class='title'>Description:</span>" + item.description + "</br>";
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
  let lat_long = new google.maps.LatLng(TAMPERE_LAT, TAMPERE_LON);

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

  directionsDisplay.setMap(myMap);
}

function drawPositions(place) {
  let address = place.address + ", " + place.postcode + ", " + place.city;
  geocoder.geocode({"address": address},
    function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        let addressLocation = results[0].geometry.location;
        new google.maps.Marker({
          position: addressLocation,
          map: myMap,
          title: place.name,
        });
      }
    }
  )
}
