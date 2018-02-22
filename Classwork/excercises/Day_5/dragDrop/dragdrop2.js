
let dropZ1Elem = document.getElementById("dropzone1");
let dropZ2Elem = document.getElementById("dropzone2");
let dropZ3Elem = document.getElementById("dropzone3");
let dragElem = document.getElementById("dragitem");

dropZ1Elem.addEventListener('dragover',allowDrop);
dropZ2Elem.addEventListener('dragover',allowDrop);
dropZ3Elem.addEventListener('dragover',allowDrop);

dropZ1Elem.addEventListener('dragleave',restoreElement);
dropZ2Elem.addEventListener('dragleave',restoreElement);
dropZ3Elem.addEventListener('dragleave',restoreElement);

dropZ1Elem.addEventListener('drop',drop);
dropZ2Elem.addEventListener('drop',drop);
dropZ3Elem.addEventListener('drop',drop);

dragElem.addEventListener('dragstart',function(e){
	e.dataTransfer.setData("text/plain",e.target.id);
});

function restoreElement(e){
	e.target.style.borderColor = "red";
}

function allowDrop(e)
{
	e.preventDefault();
	e.target.style.borderColor = "green";
	display_status("id of element entered: " + e.target.id);
}
function drop(e)
{
	e.preventDefault();
	let elementToDrop = e.dataTransfer.getData("Text");
	e.target.appendChild(document.getElementById(elementToDrop));
	
}

function display_status(messagetoshow)
{
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;

}