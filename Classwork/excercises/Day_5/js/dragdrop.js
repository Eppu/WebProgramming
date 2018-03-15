'use strict';
//Anthony gave me a hand with this one!
//card elements
let crd1 = document.getElementById("card1");//d
let crd2 = document.getElementById("card2");//h
let crd3 = document.getElementById("card3");//s
let crd4 = document.getElementById("card4");//c
//dropzones
let dropZoneHeartsElem = document.getElementById('dropzonehearts');
let dropZoneClubsElem = document.getElementById('dropzoneclubs');
let dropZoneDiamondsElem = document.getElementById('dropzonediamonds');
let dropZoneSpadesElem = document.getElementById('dropzonespades');
//the attribute value holder
let attrValue = "notempty";

//display status function
function display_status(messagetoshow) {
  let st_line = document.getElementById("status_line");
  st_line.firstChild.nodeValue = messagetoshow;
}

dropZoneHeartsElem.addEventListener('dragover', checkHearts);
dropZoneClubsElem.addEventListener('dragover', checkClubs);
dropZoneDiamondsElem.addEventListener('dragover', checkDiamonds);
dropZoneSpadesElem.addEventListener('dragover', checkSpades);

dropZoneDiamondsElem.addEventListener('drop', dropDiamonds);
dropZoneHeartsElem.addEventListener('drop', dropHearts);
dropZoneClubsElem.addEventListener('drop', dropClubs);
dropZoneSpadesElem.addEventListener('drop', dropSpades);

crd1.addEventListener('dragstart', function(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
	attrValue = "diamonds";
});
crd2.addEventListener('dragstart', function(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
	attrValue = "hearts"
});
crd3.addEventListener('dragstart', function(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
	attrValue = "spades";
});
crd4.addEventListener('dragstart', function(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
	attrValue = "clubs";
});

function checkDiamonds(e){
	if(attrValue === "diamonds"){
		display_status("Correct suit!");
	} else {
		display_status("Incorrect suit!");
	}
	e.preventDefault();
}

function checkHearts(e){
	if(attrValue == "hearts"){
		display_status("Correct suit!");
	} else {
		display_status("Incorrect suit!");
	}
	e.preventDefault();
}

function checkClubs(e){
	if(attrValue == "clubs"){
		display_status("Correct suit!");
	} else {
		display_status("Incorrect suit!");
	}
	e.preventDefault();
}

function checkSpades(e){
	if(attrValue == "spades"){
	display_status("Correct suit!");
} else {
	display_status("Incorrect suit!");
}
e.preventDefault();
}

function dropDiamonds(e){
	if(attrValue === "diamonds"){
		e.preventDefault();
		let obj = e.dataTransfer.getData("Text");
		e.target.appendChild(document.getElementById(obj));
	} else {
		e.preventDefault();
		display_status("Sorry, wrong item!");
	}
}

function dropHearts(e){
	if(attrValue === "hearts"){
		e.preventDefault();
		let obj = e.dataTransfer.getData("Text");
		e.target.appendChild(document.getElementById(obj));
	} else {
		e.preventDefault();
		display_status("Sorry, wrong item!");
	}
}
function dropClubs(e){
	if(attrValue === "clubs"){
		e.preventDefault();
		let obj = e.dataTransfer.getData("Text");
		e.target.appendChild(document.getElementById(obj));
	} else {
		e.preventDefault();
		display_status("Sorry, wrong item!");
	}
}
function dropSpades(e){
	if(attrValue === "spades"){
		e.preventDefault();
		let obj = e.dataTransfer.getData("Text");
		e.target.appendChild(document.getElementById(obj));
	} else {
		e.preventDefault();
		display_status("Sorry, wrong item!");
	}
}


function allowDrop(e) {

  //display_status("id of element entered: " + e.target.id);
}
