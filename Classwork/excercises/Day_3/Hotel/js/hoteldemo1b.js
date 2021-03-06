//get references to html elements to display information
let nameElem = document.getElementById("hotelname");
let imgElem = document.getElementById("hotelimage");
let addElem = document.getElementById("hoteladdress");
let descElem = document.getElementById("hoteldescription");
let ratingElem = document.getElementById("hotelrating");
let availabilityElem = document.getElementById("hotelavailability");
let bookingElem = document.getElementById("bookingbutton");
let cancelElem = document.getElementById("cancelbutton");

let statusElem = document.getElementById("statusline");

bookingElem.addEventListener('click',makeBookingCurrentHotel);
cancelElem.addEventListener("click",cancelBookingCurrentHotel)

//declare hotel as object literal
let hotel1 = {name: "Radisson Blu Grand Hotel Tammer",
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

//call this function when the page is loaded
showThisHotel(hotel1);

 function showThisHotel(hotelObj){
	 //displays the properties of the hotel object passed as a parameter
	nameElem.textContent = hotelObj.name;
	imgElem.src = "images/" + hotelObj.imagefile;
	addElem.textContent = hotelObj.address;
	descElem.textContent = hotelObj.description;
	ratingElem.textContent = hotelObj.rating +" Star";
	if(hotelObj.rooms > hotelObj.bookings){
		availabilityElem.textContent = "Rooms Available";
	}
	else{
		availabilityElem.textContent = "We're full - Sorry";
	}
	//availabilityElem.textContent = (hotelObj.rooms > hotelObj.bookings):"Rooms Available"?"We're full - Sorry";
	//show booking status
	statusElem.textContent = "Rooms: "+hotelObj.rooms + "   Bookings: "+ hotelObj.bookings;
 }

function makeBookingCurrentHotel(){
	hotel1.makeBooking();
	showThisHotel(hotel1);
}

function cancelBookingCurrentHotel(){
	hotel1.cancelBooking();
	showThisHotel(hotel1);
}
