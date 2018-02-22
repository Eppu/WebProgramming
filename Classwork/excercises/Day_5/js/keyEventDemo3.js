
window.addEventListener('keydown',showKeyDown);
window.addEventListener('keyup',showKeyUp);
displayStatus('waiting for an event');

function showKeyDown(e){
	//displayStatus("number of arguments = " + arguments.length);
	//displayStatus('key code '+e.keyCode+' DOWN in ' + e.target);
	displayStatus('char code '+e.charCode+' DOWN in ' + e.target);
	//displayStatus('key value '+ e.key +' DOWN in ' + e.target);
	 /*let msg = "";
	 switch(e.key){
		 case "ArrowDown": msg += "DOWN arrow"; break;
		 case "ArrowUp": msg += "UP arrow"; break;
		 case "ArrowLeft": msg += "LEFT arrow"; break;
		 case "ArrowRight": msg += "RIGHT arrow"; break;
		 case "Enter": msg += "ENTER"; break;
		 case "Escape": msg += "ESCAPE"; break;
		 case "M": msg += "M"; break;
		 case "m": msg += "m"; break;
		 default:msg += 'OTHER'; break;
	 }
	 msg += " key pressed on keydown event in " + e.target;
	 displayStatus(msg); */
}

function showKeyUp(e){
	//displayStatus("key UP");
	displayStatus('key code '+e.keyCode+' on keyup event in ' + e.target);
}

function displayStatus(messagetoshow)
{
	let stLine = document.getElementById("status_line");
	stLine.firstChild.nodeValue = messagetoshow;

}
