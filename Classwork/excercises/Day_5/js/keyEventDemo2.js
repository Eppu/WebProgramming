'use strict';

window.addEventListener('keydown',showKeyDown);
window.addEventListener('keyup',showKeyUp);
displayStatus('waiting for an event');

function showKeyDown(e){
	//displayStatus("number of arguments = " + arguments.length);
	//displayStatus('key code '+e.keyCode+' DOWN in ' + e.target);
	displayStatus('key value '+ e.key +' DOWN in ' + e.target);
}

function showKeyUp(e){
	//displayStatus("key UP");
	displayStatus('key code '+e.keyCode+' UP in ' + e.target);
}

function displayStatus(messagetoshow)
{
	let stLine = document.getElementById("status_line");
	stLine.firstChild.nodeValue = messagetoshow;

}
