
let dropElem = document.getElementById('dropzone');
let dragElem = document.getElementById('dragitem');

dropElem.addEventListener('dragover', function(e){
	e.preventDefault();
});

dropElem.addEventListener('drop', function(e){
	e.preventDefault();
	let elementToDrop = e.dataTransfer.getData("Text");
	e.target.appendChild(document.getElementById(elementToDrop));
});

dragElem.addEventListener('dragstart',function(e){
	e.dataTransfer.setData("text/plain",e.target.id);
});
