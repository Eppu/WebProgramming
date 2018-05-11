//TODO:
//  - School button logic
//  - Add Geolocating for the user
//  - Media queries
//  - Fine tune animations etc

//initial settings for the map
const TAMPERE_LAT = 61.4922779;
const TAMPERE_LON = 23.7608524;
const INIT_ZOOM = 13;
//update frequency in milliseconds
const UPDATE_FREQ = 1000;

//data source
let busDataSource = "http://lissu-api.herokuapp.com/";

//static data - use this if the live API is down
//let busDataSource = "./testdata.json";

//html element references
let clearArrayBtn = document.getElementById("cleararraybutton");
let clearBtn = document.getElementById("clearbutton");
let modal = document.getElementById('myModal');
let modalBtn = document.getElementById("myBtn");
let geolocBtn = document.getElementById("geolocationButton");
let modalClBtn = document.getElementById("modalCloseBtn");
let mapDivElem = document.getElementById("mapholder");
let mediapolisBtn = document.getElementById("mediapolisButton");
let tamkBtn = document.getElementById("mainCampusButton");
let universityBtn = document.getElementById("universityButton");

//google maps variables
let myMap;
let geocoder = new google.maps.Geocoder();
let directionsService = new google.maps.DirectionsService();
let directionsDisplay = new google.maps.DirectionsRenderer();
let infoWindow = new google.maps.InfoWindow;
let userLocWindow = new google.maps.InfoWindow;
let markerIcon = "./marker1.png";
let activeWindow;

//arrays to store marker information as well as the chosen bus lines
let markers = new Array();
//show these lines by default
let chosenBusLines = ["8", "17", "5"];
//let deployedBusLines = new Array();
let userPositionMarker;

let mediapolisLines = ["8", "17"];
let tamkLines = ["1", "5", "8", "28A", "28B", "28C", "28Y", "29", "80", "90"];
let universityLines = ["2", "6", "9A", "9B", "15", "28B", "40"];

let gotInitialValues = false;

//store the markers as seperate objects using this classs
class BusMarker {
  constructor(mapMarker, busId, busLine) {
    this.mapMarker = mapMarker;
    this.busId = busId;
    this.busLine = busLine;
  }
}

//Event listeners
clearBtn.addEventListener("click", clearMarkers);

geolocBtn.addEventListener("click", locateUser);

//clear the chosen lines, clear all the markers and remove the selected classes from buttons
clearArrayBtn.addEventListener("click", function() {
  clearButtons();
  chosenBusLines.length = 0;
  clearMarkers();
});
//on a click of the modalBtn, show the modal menu
modalBtn.onclick = function() {
  modal.style.display = "block";
}
//on click of the modalClBtn, hide the modal menu
modalClBtn.onclick = function() {
  modal.style.display = "none";
}

mediapolisBtn.addEventListener("click", function() {
  showSchoolLines(mediapolisLines);
});

tamkBtn.addEventListener("click", function() {
  showSchoolLines(tamkLines);
});

universityBtn.addEventListener("click", function() {
  showSchoolLines(universityLines);
});

//Add event listeners to all elements with the "line-btn" class
function addListeners() {
  document.querySelectorAll(".line-btn").forEach(function(elem) {
    elem.addEventListener("click", function() {
      //if the array already includes the value of the current elem, remove it
      if (chosenBusLines.includes(elem.value)) {
        removeFromSelection(elem);
        //otherwise push it to the array
      } else {
        addToSelection(elem);
      }
    });
  });
}

//add the passed in element's value to the chosen bus lines. After that, reload to make sure no duplicate markers stay on the map.
function addToSelection(elem) {
  clearMarkers();
  chosenBusLines.push(elem.value);
  console.log(chosenBusLines);
  gotInitialValues = false;
  checkIfSelected(elem);
  getJSONData();
}

//filter out the passed in element's value from the chosen bus lines. After that, reload the buses to make sure no duplicate markers stay on the map.
function removeFromSelection(elem) {
  chosenBusLines = chosenBusLines.filter(e => e !== elem.value);
  clearMarkers();
  console.log(chosenBusLines);
  gotInitialValues = false;
  checkIfSelected(elem);
  getJSONData();
}

function checkIfSelected(thisElement) {
  if (chosenBusLines.includes(thisElement.value)) {
    thisElement.classList.add("selected");
  } else {
    thisElement.classList.remove("selected");
  }
}



getJSONData();
addListeners();
showMap();
checkInitialSelections();


function checkInitialSelections() {
  window.onload = function() {
    document.querySelectorAll(".line-btn").forEach(function(elem) {
      checkIfSelected(elem);
    });
  };
}

//fetch the data from the API
function getJSONData() {
  fetch(busDataSource)
    .then(
      function(response) {
        //if something goes wrong, log an error message.
        if (response.status !== 200) {
          Console.log('data transfer NOT complete. Status Code: ' + response.status);
          return;
        }
        response.json().then(function(data) {
          //if the data hasn't been fetched before, run the storeBusData function.
          if (data.vehicles !== undefined) {
            if (!gotInitialValues) {
              //display_status("number of items found " + data.vehicles.length);
              data.vehicles.forEach(storeBusData);
              gotInitialValues = true;
              //if the data has already been stored once, run the updateBusData function instead.
            } else {
              //display_status("number of items found " + data.vehicles.length);
              data.vehicles.forEach(updateBusData);
            }
          } else {
            console.log("Error. Bus data not found. Try again in a few minutes.");
            return;

          }
        });
      }
    )
    .catch(function(err) {
      Console.log('Fetch Error :' + err);
      console.log("Error.");
    });
}
//create a new google map
function showMap() {
  let lat_long = new google.maps.LatLng(TAMPERE_LAT, TAMPERE_LON);
  let mapOptions = {
    center: lat_long,
    zoom: INIT_ZOOM,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL
    },
  };
  myMap = new google.maps.Map(mapDivElem, mapOptions);
  directionsDisplay.setMap(myMap);
}

//store the bus data as markers in an array
function storeBusData(thisBus) {
  let currentBusLocation = new google.maps.LatLng(thisBus.latitude, thisBus.longitude);
  //custom marker icon for the buses
  let myIcon = {
    path: "M157,311c60.8,0,110.1-48.2,110.2-107.7c0-80-110-201.9-110-201.9S47,123.2,47,203.1C46.9,262.7,96.2,311,157,311z",
    fillColor: "#e71784",
    fillOpacity: 1,
    strokeColor: "#a50e64",
    strokeWeight: 1,
    anchor: new google.maps.Point(157, 168),
    labelOrigin: new google.maps.Point(157, 168),
    scale: 0.1,
    rotation: thisBus.rotation
  };

  //store the info windows' content in this variable
  let infoWindowContent =
    '<div id="content">' +
    '<h3 id="firstHeading" class="firstHeading">Line ' + thisBus.line + '</h3>' +
    '<div id="bodyContent">' +
    '<p><b>From: </b>' + thisBus.origin + '<br/>' +
    '<p><b>To: </b>' + thisBus.destination + '<br/>'
  '</div>' +
  '</div>';

  if (chosenBusLines.includes(thisBus.line)) { //need to check if the current buses line equals to something inside the chosenBusLines array?
    //create variable for the bus info windows
    let markerInfoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    //declare a new marker
    let myMarker = new google.maps.Marker({
      position: currentBusLocation,
      map: myMap,
      title: thisBus.line + " to " + thisBus.destination,
      infowindow: markerInfoWindow,
      label: {
        text: thisBus.line,
        color: 'white',
        fontSize: "10px",
      },
      icon: myIcon,
    });
    google.maps.event.addListener(myMarker, 'click', function() {
      if (activeWindow != null) activeWindow.close();
      this.infowindow.open(myMap, this);
      activeWindow = this.infowindow;

    });
    let thisMarker = new BusMarker(myMarker, thisBus.id, thisBus.line);
    markers.push(thisMarker);
  }
}

function hideAllInfoWindows(map) {
  markers.forEach(function(marker) {
    marker.infowindow.close(map, marker);
  });
}

//update the positions of the markers
function updateBusData(thisBus) {
  if (chosenBusLines.includes(thisBus.line)) { //need to check if the current buses line equals to something inside the chosenBusLines array?
    for (i = 0; i < markers.length; i++) {
      if (thisBus.id == markers[i].busId) {
        let icon = markers[i].mapMarker.getIcon();
        markers[i].mapMarker.setPosition(new google.maps.LatLng(thisBus.latitude, thisBus.longitude));
        icon.rotation = thisBus.rotation;
        markers[i].mapMarker.setIcon(icon);
      }
    }
  }
}

function busAlreadyHasMarker(busItem) {
  for (i = 0; i < markers.length; i++) {
    if (markers[i].busId == busItem.id) {
      console.log(busItem);
      return i;
    } else {
      return -1;
    }
  }
}

function locateUser() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        myMap.setCenter(pos);
        if (userPositionMarker) {
          userPositionMarker.setMap(null);
          userPositionMarker.length = 0;
          createUserPositionMarker(pos);
        } else {
          createUserPositionMarker(pos);
        }

      },
      function() {
        handleLocationError(true, infoWindow, myMap.getCenter());
      });
  } else {
    // browser doesn't support Geolocation
    handleLocationError(false, infoWindow, myMap.getCenter());
  }
}

function createUserPositionMarker(pos) {
  let userIcon = {
    //path for an svg image. need to use a path instead of url for browser compatibility and modifying the image with js code.
    path: "M 302.07468,1018.9879 C 286.25571,1013.7975 273.72731,1002.1224 270.14882,989.23628 C 268.72288,984.1015 268.04339,879.0565 268.03581,662.57732 L 268.02464,343.48701 L 260.00981,343.48701 L 251.99498,343.48701 L 251.99498,463.93754 C 251.99498,582.0174 251.91344,584.53145 247.85195,591.67385 C 242.59122,600.92516 236.68341,605.26002 225.12128,608.3524 C 208.02752,612.9243 189.33348,604.19421 182.62031,588.50452 C 178.30101,578.40967 178.58231,309.1661 182.92959,292.47574 C 192.72875,254.85424 224.46236,224.03277 261.4729,216.19007 C 280.96898,212.05877 461.22336,212.00781 480.66203,216.12811 C 500.46216,220.32503 517.4686,229.81823 532.51666,245.07399 C 547.995,260.76598 555.2203,273.49531 560.60963,294.56739 C 564.3661,309.255 564.57327,317.12085 564.57327,445.05908 C 564.57327,562.00859 564.1613,581.03909 561.49128,587.42934 C 557.33972,597.36544 553.06762,601.83388 543.53434,606.21158 C 527.71428,613.47618 507.6073,608.80266 498.25271,595.68663 L 493.44167,588.94109 L 492.89594,466.21405 L 492.35019,343.48701 L 484.38018,343.48701 L 476.41016,343.48701 L 476.41016,664.14446 C 476.41016,1015.6449 477.20541,992.30562 464.78255,1005.3947 C 454.96943,1015.734 444.96244,1019.6452 428.32119,1019.6452 C 411.67995,1019.6452 401.67295,1015.734 391.85984,1005.3947 C 379.6788,992.56041 380.23223,1002.5082 380.23223,796.3891 L 380.23223,607.97631 L 372.2174,607.97631 L 364.20257,607.97631 L 364.20257,796.3891 C 364.20257,949.93319 363.70254,985.99515 361.50065,991.24959 C 357.46396,1000.8825 348.6824,1010.38 339.46404,1015.0829 C 330.57932,1019.6155 310.40822,1021.7222 302.07468,1018.9879 z M 347.1449,193.72648 C 322.92259,185.07506 307.9519,171.7394 297.35531,149.37467 C 291.49021,136.996 291.06727,134.61803 291.06727,114.02045 C 291.06727,93.178545 291.43138,91.197919 297.54651,78.776333 C 328.09011,16.733472 416.2698,16.581356 446.76157,78.518927 C 453.07499,91.343304 453.36753,92.959846 453.36753,115.02231 C 453.36753,136.24035 452.91461,139.02936 447.76661,149.51259 C 439.11869,167.12288 426.3456,179.96367 408.89892,188.58629 C 395.35312,195.28098 391.91342,196.11457 375.4939,196.68179 C 361.71596,197.15774 354.7057,196.42694 347.1449,193.72648 z ",

    fillColor: "#777",
    fillOpacity: 1,
    anchor: new google.maps.Point(372, 525),
    scale: 0.04,
  };

  userPositionMarker = new google.maps.Marker({
    position: pos,
    map: myMap,
    title: "Your position",
    animation: google.maps.Animation.DROP,
    icon: userIcon,
  });
  userPositionMarker.addListener('click', function() {
    geocoder.geocode({
      'location': pos
    }, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {

          userLocWindow.setContent(results[0].formatted_address);
          userLocWindow.open(myMap, userPositionMarker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  });
  myMap.setCenter(pos);
  myMap.setZoom(15);
  //infoWindow.setPosition(pos);
  //infoWindow.setContent('Location found.');
  //infoWindow.open(myMap);

}



/* function locateUser() {
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
} */

// Send the user an error message if the geolocating failed, or if the browser doesn't support geolocation.
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed. Try turning on your location data.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(myMap);
}

function clearButtons() {
  document.querySelectorAll(".line-btn").forEach(function(elem) {
    elem.classList.remove("selected");
  });
}

function showSchoolLines(lineArray) {
  //first remove all lines from the arrays
  chosenBusLines.length = 0;
  clearButtons();
  clearMarkers();
  for (i = 0; i < lineArray.length; i++) {
    chosenBusLines.push(lineArray[i]);
  }
  //lines to the university: 2 6 9A 9B 15 28B 40
  //chosenBusLines.push("2", "6", "9A", "9B", "15", "28B", "40");
  //set the activated lines' buttons to the selected state
  document.querySelectorAll(".line-btn").forEach(function(elem) {
    checkIfSelected(elem);
  });
  gotInitialValues = false;
  console.log(chosenBusLines);
  getJSONData();
}

//set the interval of calling getJSONData to the UPDATE_FREQ constant (1000ms)
setInterval(getJSONData, UPDATE_FREQ);

/* function display_status(messagetoshow) {
  let st_line = document.getElementById("status_line");
  st_line.firstChild.nodeValue = messagetoshow;
} */




// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  console.log("Got click");
  for (i = 0; i < markers.length; i++) {
    markers[i].mapMarker.setMap(null);
  }
  markers.length = 0;
}

/*-------------------------------------------------------
//These don't do anything at the moment!

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  for (i = 0; i < markers.length; i++){
  markers[i].mapMarker.setMap(null);
  }
    markers.length = 0;
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

---------------------------------------------------------*/