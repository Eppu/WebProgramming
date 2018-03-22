let dataButtonElem = document.getElementById("getDataButton");
let panelElem = document.getElementById("container");

let omenaHotelObj = {
  "name":"Omena Hotel Tampere",
  "picture":"omenahotel.jpg",
  "address":"Hämeenkatu 7",
  "postcode":"33100",
  "city":"Tampere",
  "starRating":"3",
  "description":"Situated just 200 metres from Tampere Train Station, this hotel is across the street from Stockmann Department Store. It features rooms with a flat-screen TV, microwave and fridge."
};

dataButtonElem.addEventListener("click", createDOMObject(omenaHotelObj));

function createDOMObject(item){
  let newItem = document.createElement("div");
  newItem.setAttribute("class", "hotelrecord");

  let content = "";

  content += "<div class='recordtext'>";
  content += "<p>";
  content += "<span class='title'>Name: </span> " + item.name + "</br>";
  content += "<span class='title'>Address: </span>" + item.address+  "</br>";
  content += "<span class='title'>Postcode: </span>" + item.postcode +"</br>";
  content += "<span class='title'>City: </span>" + item.city + "</br>";
  content += "<span class='title'>Star rating: </span>" + item.starRating +"</br>";
  content += "<span class='title'>Description:</span>" + item.description + "</br>";
  content += "</p>";
  content += "</div>";
  content += "<div class='recordimage'>";
  content += "<img class='pics' src ='images/" + item.picture + " '/>";
  content += "</div>";

  newItem.innerHTML = content;
  panelElem.appendChild(newItem);

}
