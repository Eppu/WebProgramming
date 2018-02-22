
//get references to Document objects 
let buttonElem = document.getElementById("updateButton");
let topPosElem = document.getElementById("topField");
let leftPosElem = document.getElementById("leftField");
let cz = document.getElementById("card1");

//set variables to store initial card position relative to the containing div
let topPos = 200;
let leftPos = 200;

// set values to appear in input fields
topPosElem.value = topPos;
leftPosElem.value = leftPos;

//move the element containg the card image to the starting position
cz.style.left = leftPos + "px";
cz.style.top = topPos + "px";

// add event listener to button
buttonElem.addEventListener('click',resetPosition);

//click event handler function 
function resetPosition()
{
	topPos = parseInt(topPosElem.value);
	leftPos = parseInt(leftPosElem.value);
	display_status("pos: " + leftPos + "," + topPos);
	//the values assigned to top and left must be strings
	cz.style.left = leftPos + "px";
	cz.style.top = topPos + "px";
}


function display_status(messagetoshow)
{
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;

}