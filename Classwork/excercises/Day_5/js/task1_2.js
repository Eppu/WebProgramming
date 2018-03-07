const AMOUNTTOMOVE = 2;
const UPDATEINTERVAL = 5;
//get references to Document objects
let buttonElem = document.getElementById("updateButton");
let topPosElem = document.getElementById("topField");
let leftPosElem = document.getElementById("leftField");
let cz = document.getElementById("card1");
let tableDiv = document.getElementById("table");

//set variables to store initial card position relative to the containing div
let topPos = 200;
let leftPos = 200;
//Add client width and height

// set values to appear in input fields
topPosElem.value = topPos;
leftPosElem.value = leftPos;

//move the element containg the card image to the starting position
cz.style.left = leftPos + "px";
cz.style.top = topPos + "px";

//keysDown
let keysDown = {};

// add event listener to button
buttonElem.addEventListener('click', resetPosition);
window.addEventListener('keydown', function(e) {
  keysDown[e.key] = true;
});

window.addEventListener('keyup', function(e) {
  delete keysDown[e.key];
});

window.setInterval(updateDisplay, UPDATEINTERVAL);

function updateDisplay() {
  let maxPermissableXvalue = tableDiv.clientWidth - cz.clientWidth;
  let minPermissableXvalue = 0;

  let maxPermissableYvalue = tableDiv.clientHeight - cz.clientHeight;
  let minPermissableYvalue = 0;

  if ('ArrowLeft' in keysDown || 'a' in keysDown) {
    if ((leftPos - AMOUNTTOMOVE) >= minPermissableXvalue) {
      leftPos -= AMOUNTTOMOVE;
      cz.style.left = leftPos + "px";
      display_status("Pos: " + leftPos + ", " + topPos);
    }
  }
  if ('ArrowRight' in keysDown || 'd' in keysDown) {
    if ((leftPos - AMOUNTTOMOVE) <= maxPermissableXvalue) {
      leftPos += AMOUNTTOMOVE;
      cz.style.left = leftPos + "px";
      display_status("Pos: " + leftPos + ", " + topPos);
    }
  }
  if ('ArrowUp' in keysDown || 'w' in keysDown) {
    if ((topPos - AMOUNTTOMOVE) >= minPermissableYvalue) {
      topPos -= AMOUNTTOMOVE;
      cz.style.top = topPos + "px";
      display_status("Pos: " + leftPos + ", " + topPos);
    }
  }
  if ('ArrowDown' in keysDown || 's' in keysDown) {
    if ((topPos - AMOUNTTOMOVE) <= maxPermissableYvalue) {
      topPos += AMOUNTTOMOVE;
      cz.style.top = topPos + "px";
      display_status("Pos: " + leftPos + ", " + topPos);
    }
  }
}

//click event handler function
function resetPosition() {
  topPos = parseInt(topPosElem.value);
  leftPos = parseInt(leftPosElem.value);
  display_status("pos: " + leftPos + "," + topPos);
  //the values assigned to top and left must be strings
  cz.style.left = leftPos + "px";
  cz.style.top = topPos + "px";
}

function display_status(messagetoshow) {
  let st_line = document.getElementById("status_line");
  st_line.firstChild.nodeValue = messagetoshow;

}
