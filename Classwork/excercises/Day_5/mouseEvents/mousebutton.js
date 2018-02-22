
let zoneElem = document.getElementById('mousezone');
zoneElem.addEventListener('mousedown',showButton);
zoneElem.addEventListener('mousemove',handleMouseMove);
//window.addEventListener('mousemove',handleMouseMove);

function handleMouseMove(e){
	display_status("x,y: "+ e.offsetX  + ", " + e.offsetY); 
}

function showButton(e){
	let msg = "button: ";
	switch (e.button)
	{
		case 0: msg += "left"; break;
		case 1: msg += "middle"; break;
		case 2: msg += "right"; break;
	}
	display_status(msg);
}

function display_status(messagetoshow){
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;
}
