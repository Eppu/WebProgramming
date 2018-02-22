let tableElem = document.getElementById('table');

let allzones = tableElem.getElementsByTagName("div");
for (let i =0; i< allzones.length; i++){
	setDragAndDropEventListeners(allzones[i]);
}
function setDragAndDropEventListeners(elem){
	elem.addEventListener('dragover', functionName1);
	elem.addEventListener('dragleave', functionName2);
	elem.addEventListener('drop', functionName3);
}