
let button2Elem = document.getElementById("showMeButton");
button2Elem.addEventListener('click',showMyLocation);



function showMyLocation(){
	//first check whether geolocation is supported
	if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(showPositionMarker,showError);
	}
	else{
		display_status("Geolocation not supported by this browser ");
	}
	
}
function showPositionMarker(position){
	
	let positionMsg = "Your position: (lat) " + position.coords.latitude + " (lon) " + position.coords.longitude;  

	display_status(positionMsg);
}

function showError(error)
{
	let msg= "";
	switch(error.code)
	{
		case error.PERMISSION_DENIED: msg ="User denied request for geolocation"; break;
		case error.POSITION_UNAVAILABLE: msg ="Position is NOT available"; break;
		case error.TIMEOUT: msg ="Request to get user position has timed out"; break;
		case error.UNKNOWN_ERROR: msg ="Unknown error has occurred"; break;
	}
	display_status("Error: " + msg);
}
function display_status(messagetoshow)
{
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;
}