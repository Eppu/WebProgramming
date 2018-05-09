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

//html element references
let clearArrayBtn = document.getElementById("cleararraybutton");
let clearBtn = document.getElementById("clearbutton");
let modal = document.getElementById('myModal');
let modalBtn =  document.getElementById("myBtn");
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

//arrays to store marker information as well as the chosen bus lines
let markers = new Array();
//show these lines by default
let chosenBusLines = ["8", "17", "5"];
//let deployedBusLines = new Array();

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

//clear the chosen lines, clear all the markers and remove the selected classes from buttons
clearArrayBtn.addEventListener("click", function(){
  document.querySelectorAll(".line-btn").forEach(function(elem) {
    elem.classList.remove("selected");
  });
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
 //Add lines going to Mediapolis into the array if they're not on there already. (8 and 17). Do the same for the other schools in other listeners.
 //Also display a marker where the school is?
        //chosenBusLines = chosenBusLines.filter(e => e !== "17");
        console.log(chosenBusLines);
});

//Add event listeners to all elements with the "line-btn" class
function addListeners() {
    document.querySelectorAll(".line-btn").forEach(function(elem) {
        elem.addEventListener("click", function() {
          //if the array already includes the value of the current elem, remove it
          if(chosenBusLines.includes(elem.value)){
            removeFromSelection(elem);
          //otherwise push it to the array
          } else {
            addToSelection(elem);
          }
        });
    });
}

//add the passed in element's value to the chosen bus lines. After that, reload to make sure no duplicate markers stay on the map.
function addToSelection(elem){
  clearMarkers();
  chosenBusLines.push(elem.value);
  console.log(chosenBusLines);
  gotInitialValues = false;
  checkIfSelected(elem);
  getJSONData();
}

//filter out the passed in element's value from the chosen bus lines. After that, reload the buses to make sure no duplicate markers stay on the map.
function removeFromSelection(elem){
  chosenBusLines = chosenBusLines.filter(e => e !== elem.value);
  clearMarkers();
  console.log(chosenBusLines);
  gotInitialValues = false;
  checkIfSelected(elem);
  getJSONData();
}

function checkIfSelected(thisElement){
  if(chosenBusLines.includes(thisElement.value)){
    thisElement.classList.add("selected");
  } else {
    thisElement.classList.remove("selected");
  }
}




getJSONData();
addListeners();
showMap();
checkInitialSelections();


function checkInitialSelections(){
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
          if (!gotInitialValues) {
            //display_status("number of items found " + data.vehicles.length);
            data.vehicles.forEach(storeBusData);
            gotInitialValues = true;
            //if the data has already been stored once, run the updateBusData function instead.
          } else {
            //display_status("number of items found " + data.vehicles.length);
            data.vehicles.forEach(updateBusData);
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
  if (chosenBusLines.includes(thisBus.line)) { //need to check if the current buses line equals to something inside the chosenBusLines array?
    let myMarker = new google.maps.Marker({
      position: currentBusLocation,
      map: myMap,
      title: thisBus.line + " to " + thisBus.destination,
    });
    let thisMarker = new BusMarker(myMarker, thisBus.id, thisBus.line);
    markers.push(thisMarker);
  }
}

//update the positions of the markers
function updateBusData(thisBus) {
  if (chosenBusLines.includes(thisBus.line)) { //need to check if the current buses line equals to something inside the chosenBusLines array?
    for (i = 0; i < markers.length; i++) {
      if (thisBus.id == markers[i].busId) {
        markers[i].mapMarker.setPosition(new google.maps.LatLng(thisBus.latitude, thisBus.longitude));
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

//set the interval of calling getJSONData to the UPDATE_FREQ constant (1000ms)
setInterval(getJSONData, UPDATE_FREQ);

/* function display_status(messagetoshow) {
  let st_line = document.getElementById("status_line");
  st_line.firstChild.nodeValue = messagetoshow;
} */




// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  console.log("Got click");
  for (i = 0; i < markers.length; i++){
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
