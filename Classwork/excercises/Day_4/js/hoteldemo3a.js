//get references to html elements to display information
let nameElem = document.getElementById("hotelname");
let imgElem = document.getElementById("hotelimage");
let addElem = document.getElementById("hoteladdress");
let descElem = document.getElementById("hoteldescription");
let ratingElem = document.getElementById("hotelrating");
let availabilityElem = document.getElementById("hotelavailability");
let bookingElem = document.getElementById("bookingbutton");
let cancelElem = document.getElementById("cancelbutton");
let previousElem = document.getElementById("previousbutton");
let nextElem = document.getElementById("nextbutton");

let statusElem = document.getElementById("statusline");

bookingElem.addEventListener('click',makeBookingCurrentHotel);
cancelElem.addEventListener('click',cancelBookingCurrentHotel);
previousElem.addEventListener('click',getPreviousHotel);
nextElem.addEventListener('click',getNextHotel);

class Hotel {
	constructor(name,imagefile,address,rating,rooms){
		this.name = name;
		this.imagefile = imagefile;
		this.address = address;
		this.rating = rating;
		this.rooms = rooms;
		this.bookings = 0;
		this.description = "default description";
	}
	makeBooking(){
		if(this.rooms > this.bookings){
			this.bookings +=1;
		}
	}
	cancelBooking(){
		if(this.bookings > 0){
			this.bookings -=1;
		}
	}
	checkAvailability(){
		return(this.rooms > this.bookings);
	}
}

//declare hotel as object literal
/* let hotel1 = {name: "Radisson Blu Grand Hotel Tammer",
			imagefile : "GrandHotelTammer.jpg",
			address: "Satakunnankatu 13, 33100 Tampere, Finland", 
			rating: 4, 
			rooms: 50,
			bookings: 35,
			description: "The 1920s-style Radisson Blu Grand Hotel Tammer is situated 50 m from Koskipuisto Park. It offers free sauna access and free wired internet in all rooms. Tampere Station is 700 m away.",
			makeBooking: function(){
				if(this.rooms > this.bookings){
					this.bookings +=1;
				}
			},
			cancelBooking: function(){
				if(this.bookings > 0){
					this.bookings -=1;
				}
			},
			checkAvailability: function(){
				return(this.rooms > this.bookings);
			}
};

 

let hotel2 = {name: "Omena Hotel Tampere",
			imagefile : "OmenaHotelTampere.jpg",
			address: "Hämeenkatu 7, 33100 Tampere, Finland", 
			rating: 3, 
			rooms: 30,
			bookings: 25,
			description: "Situated just 200 metres from Tampere Train Station, this hotel is across the street from Stockmann Department Store. It features rooms with a flat-screen TV, microwave and fridge.",
			makeBooking: function(){
				if(this.rooms > this.bookings){
					this.bookings +=1;
				}
			},
			cancelBooking: function(){
				if(this.bookings > 0){
					this.bookings -=1;
				}
			},
			checkAvailability: function(){
				return(this.rooms > this.bookings);
			}
};


let hotel3 = {name: "Mango Hotel",
			imagefile : "MangoHotel.jpg",
			address: "Hatanpään Puistokuja 36, 33900 Tampere, Finland", 
			rating: 3, 
			rooms: 35,
			bookings: 30,
			description: "This good-value hotel is 5 minutes’ drive from Tampere Train Station and Tampere Hall. It offers free parking, free in-room wired internet, a laundry room and a guest kitchen with free tea/coffee.",
			makeBooking: function(){
				if(this.rooms > this.bookings){
					this.bookings +=1;
				}
			},
			cancelBooking: function(){
				if(this.bookings > 0){
					this.bookings -=1;
				}
			},
			checkAvailability: function(){
				return(this.rooms > this.bookings);
			}
}; */
//declare array of hotels
let allHotels = new Array();
let currentHotel = 0;

allHotels[0] = new Hotel("Radisson Blu Grand Hotel Tammer", "GrandHotelTammer.jpg","Satakunnankatu 13, 33100 Tampere, Finland",4,50);
allHotels[1] = new Hotel("Omena Hotel Tampere","OmenaHotelTampere.jpg","Hämeenkatu 7, 33100 Tampere, Finland",3,30);
allHotels[2] = new Hotel("Mango Hotel","MangoHotel.jpg","Hatanpään Puistokuja 36, 33900 Tampere, Finland", 3, 35);

//call this function when the page is loaded
showThisHotel(allHotels[currentHotel]);


 function showThisHotel(hotelObj){
	 //displays the properties of the hotel object passed as a parameter
	nameElem.textContent = hotelObj.name;
	imgElem.src = "images/" + hotelObj.imagefile;
	addElem.textContent = hotelObj.address;
	descElem.textContent = hotelObj.description;
	ratingElem.textContent = hotelObj.rating +" Star";
	if(hotelObj.checkAvailability()){
		availabilityElem.textContent = "Rooms Available";
	}
	else{
		availabilityElem.textContent = "We're full - Sorry";
	}
	//availabilityElem.textContent = (hotelObj.checkAvailability()):"Rooms Available"?"We're full - Sorry";
	//show booking status
	statusElem.textContent = "Rooms: "+hotelObj.rooms + "   Bookings: "+ hotelObj.bookings;
 }
 
function makeBookingCurrentHotel(){
	allHotels[currentHotel].makeBooking();
	showThisHotel(allHotels[currentHotel]);
}

function cancelBookingCurrentHotel(){
	allHotels[currentHotel].cancelBooking();
	showThisHotel(allHotels[currentHotel]);
}

function getNextHotel(){
	if(currentHotel < (allHotels.length - 1)){
		currentHotel += 1;
		showThisHotel(allHotels[currentHotel]);
	}
}

function getPreviousHotel(){
	if(currentHotel > 0){
		currentHotel -= 1;
		showThisHotel(allHotels[currentHotel]);
	}
}
 
 