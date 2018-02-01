//Declare HTML event references
let val1Elem = document.getElementById("value1");
let val2Elem = document.getElementById("value2");
let val3Elem = document.getElementById("value3");
let minBtn = document.getElementById("showMinButton");
let maxBtn = document.getElementById("showMaxButton");
let msgElem = document.getElementById("outputMessage");

//Declare event listeners
maxBtn.addEventListener('click', showMaximumValue);
minBtn.addEventListener('click', showMinimumValue);

function showMaximumValue(){
  let val1 = parseFloat(val1Elem.value);
  let val2 = parseFloat(val2Elem.value);
  let val3 = parseFloat(val3Elem.value);
  let biggest = val1;
  if(val2 > biggest){
    biggest = val2;
  }
  if(val3 > biggest){
    biggest = val3;
  }
  msgElem.textContent = "The largest value in " + val1 + ", " + val2 + " and " + val3 + " is " + biggest;
}

function showMinimumValue(){
  let val1 = parseFloat(val1Elem.value);
  let val2 = parseFloat(val2Elem.value);
  let val3 = parseFloat(val3Elem.value);
  let smallest = val1;
  if(val2 < smallest){
    smallest = val2;
  }
  if(val3 < smallest){
    smallest = val3;
  }
  msgElem.textContent = "The smallest value in " + val1 + ", " + val2 + " and " + val3 + " is " + smallest;
}
