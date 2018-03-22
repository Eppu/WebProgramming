const KNILAT = 64.2168758;
const KNILONG = 27.6939227;
const zm = 13;
let myMap;
let mapDivElem = document.getElementById("mapholder");

let kajaaniLocation = new google.maps.LatLng(KNILAT, KNILONG);
let directionsService = new google.maps.DirectionsService();
let directionsDisplay = new google.maps.DirectionsRenderer();

showGoogleMap();

class Place {
  constructor(name, displayName, xloc, yloc) {
    this.name = name;
    this.displayName = displayName;
    this.xloc = xloc;
    this.yloc = yloc;
  }
}
//maps objects
let mapElem = document.getElementById("mapholder");

//get references to button objects
let showButtonElem = document.getElementById("showroute");
let clearButtonElem = document.getElementById("clearroute");
let showAllButtonElem = document.getElementById("showalllocations");

// add button event listeners

clearButtonElem.addEventListener('click', clearCanvasToMap);


showButtonElem.addEventListener('click', function() {
  showRoute(kajaaniPlaces)
});

showAllButtonElem.addEventListener('click', function() {
  showAllPlaces(kajaaniPlaces)
});

//get references to select objects
let start = document.getElementById("startplace");
let end = document.getElementById("endplace");


//create array of place objects
let kajaaniPlaces = new Array();

kajaaniPlaces[0] = new Place("linnanrauniot", "Kajaani Castle Ruins", 64.2292511, 27.7305087);
kajaaniPlaces[1] = new Place("kauppakatu", "Kauppakatu", 64.2252801, 27.7304575);
kajaaniPlaces[2] = new Place("keskussairaala", "Kainuu Central Hospital", 64.2145361, 27.7266107);
kajaaniPlaces[3] = new Place("kaupunginlampi", "Kajaani City Pond", 64.2278237, 27.7030033);
kajaaniPlaces[4] = new Place("ammattikorkeakoulu", "Kajaani UAS", 64.2150652, 27.7083639);
kajaaniPlaces[5] = new Place("rautatieasema", "Railway Station", 64.2200876, 27.7367553);

//populate the HTML select element with place names
loadPlaceNames(kajaaniPlaces);

function loadPlaceNames(places) {
  let nameToShowNode;
  let optionNode,
    optionNodeCopy;

  // loop through places array, create <option> element and append to start and end <select> elements
  for (let count = 0; count < places.length; count++) {
    // create option node
    nameToShowNode = document.createTextNode(places[count].displayName);
    optionNode = document.createElement("option");
    optionNode.appendChild(nameToShowNode);
    optionNode.setAttribute("value", count);
    // create a copy of the node
    optionNodeCopy = optionNode.cloneNode(true);
    // add the node and the clone to two <select> elements
    start.appendChild(optionNode);
    end.appendChild(optionNodeCopy);
  }
}

function showGoogleMap() {
  display_status("fetching map.. ");

  let mapOptions = {
    center: kajaaniLocation,
    zoom: zm,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL
    },
  };
  myMap = new google.maps.Map(mapDivElem, mapOptions);
  //**********  set map for  directionsRenderer service
  directionsDisplay.setMap(myMap);

  display_status("Map found.");
}

function showRoute(places) {
  directionsDisplay.setMap(myMap);
  let s = parseInt(start.value);
  let e = parseInt(end.value);

  let startLoc = new google.maps.LatLng(kajaaniPlaces[s].xloc, kajaaniPlaces[s].yloc);
  let endLoc = new google.maps.LatLng(kajaaniPlaces[e].xloc, kajaaniPlaces[e].yloc);

  let routeRequest = {
    origin: startLoc,
    destination: endLoc,
    travelMode: 'WALKING'
  };
  directionsService.route(routeRequest, function(result, status) {
    if (status == "OK") {
      directionsDisplay.setDirections(result);
      display_status("Route found! " + startLoc + " to " + endLoc);
    }
  });
}

function showAllPlaces(places) {
  for (i = 0; i < places.length; i++) {
    currentLocation = new google.maps.LatLng(places[i].xloc, places[i].yloc)
    new google.maps.Marker({
      position: currentLocation,
      map: myMap,
      title: places[i].displayName,
    });
  }
}

function clearCanvasToMap() {
  directionsDisplay.setMap(null);

}

function display_status(messagetoshow) {
  let st_line = document.getElementById("status_line");
  st_line.firstChild.nodeValue = messagetoshow;
}
