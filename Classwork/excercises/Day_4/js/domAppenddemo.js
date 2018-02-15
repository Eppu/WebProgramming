
let changeButton = document.getElementById('change');
changeButton.addEventListener('click', appendElement);

function appendElement(){
	let parentDiv = document.getElementById('page');
	let newHeader = document.createElement('h2');
	let newTxt = document.createTextNode('Great!');
	
	newHeader.appendChild(newTxt);
	parentDiv.appendChild(newHeader);
	
	
}