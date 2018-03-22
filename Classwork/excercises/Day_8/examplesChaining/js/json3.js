'use strict';
var buttonElem = document.getElementById("getDataButton");
buttonElem.addEventListener('click',getJSONData);

var containerElem = document.getElementById('container');
var xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");
xhr.addEventListener('load', processJSONData);

var responseObject;  // reference to the data obtained from the JSON request

function getJSONData(){
	xhr.open('GET','data/names3.json');
	xhr.send();
}

function processJSONData(){

	if (xhr.status === 200){
		display_status("processing json file, contains: "+ xhr.responseText);
		
		responseObject = JSON.parse(xhr.responseText);
		//is this a single item or an array of items
		if(responseObject.length !=='undefined'){
			for(var i = 0;i < responseObject.length;i++){
				createDOMObject(responseObject[i]);
			}
		} else{
			createDOMObject(responseObject);
		}
		
	}
}
function createDOMObject(item){
	var newItem = document.createElement('p');
	var content = "name: "+ item.name + ", age: "+ item.age;
	var newText = document.createTextNode(content);
	newItem.setAttribute('class','newsitem');
	newItem.appendChild(newText);
	container.appendChild(newItem);
}

function display_status(messagetoshow)
{
	var st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;
}