'use strict';

//capture events happening anywhere in the window
window.addEventListener('keydown',showKeyDown);
window.addEventListener('keyup',showKeyUp);
displayStatus('waiting for an event');

function showKeyDown(){
	displayStatus("key DOWN");
	//displayStatus("number of arguments = " + arguments.length);
}

function showKeyUp(){
	displayStatus("key UP");
	//displayStatus("number of arguments = " + arguments.length);
}

function displayStatus(messagetoshow)
{
	let stLine = document.getElementById("status_line");
	stLine.firstChild.nodeValue = messagetoshow;

}
