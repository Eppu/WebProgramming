//get references to html elements to display information
let nameElem = document.getElementById("hotelname");
let imgElem = document.getElementById("hotelimage");
let addElem = document.getElementById("hoteladdress");
let descElem = document.getElementById("hoteldescription");
let ratingElem = document.getElementById("hotelrating");
let availabilityElem = document.getElementById("hotelavailability");
let bookingElem = document.getElementById("bookingbutton");

let statusElem = document.getElementById("statusline");



//declare hotel as object literal
let hotel1 = {name: "Radisson Blu Grand Hotel Tammer",
			imagefile : "GrandHotelTammer.jpg",
			address: "Satakunnankatu 13, 33100 Tampere, Finland", 
			rating: 4, 
			rooms: 50,
			bookings: 35,
			description: "The 1920s-style Radisson Blu Grand Hotel Tammer is situated 50 m from Koskipuisto Park. It offers free sauna access and free wired internet in all rooms. Tampere Station is 700 m away."
};

//call this function when the page is loaded
showThisHotel(hotel1);

 function showThisHotel(hotelObj){
	 //displays the properties of the hotel object passed as a parameter
	nameElem.textContent = hotelObj.name;
	imgElem.src = "images/" + hotelObj.imagefile;
	addElem.textContent = hotelObj.address;
	descElem.textContent = hotelObj.description;
	ratingElem.textContent = hotelObj.rating +" Star";
	
	//show booking status
	statusElem.textContent = "Rooms: "+hotelObj.rooms + "   Bookings: "+ hotelObj.bookings;
 }

 
 