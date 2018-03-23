'use strict';
var buttonElem = document.getElementById("getDataButton");
buttonElem.addEventListener('click',getJSONData);
let dataSource = "data/names2.json";

function getJSONData(){
	fetch(dataSource)
	  .then(
		function(response) {
		  if (response.status !== 200) {
			display_status('data transfer NOT complete. Status Code: ' + response.status);
			return;
		  }

		  // Examine the text in the response
		  response.json().then(function(data) {

				display_status("number of items found " + data.length);
				data.forEach(createDOMObject);
		  });

		}
	  )
	  .catch(function(err) {
		display_status('Fetch Error :' + err);
	  });
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
