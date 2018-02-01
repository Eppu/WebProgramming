//Declare HTML element references and variables
let buttonElement = document.getElementById("nameButton");
let outputElement = document.getElementById("outputMessage");
let nameInp = document.getElementById("nameInput");
let addNameBtn = document.getElementById("addNameButton");
let clearBtn = document.getElementById("clearButton");
let names = new Array();
let namesAdded = 0;
let MAXNUMBER = 5;
let nameOutput = "";
//Event listeners
buttonElement.addEventListener("click", outputNames);
addNameBtn.addEventListener("click", addNames);
clearBtn.addEventListener("click", clearArray);

//Loop through the names array, add each name to the nameOutput string. Then output the names.
function outputNames(){
  for(let i = 0; i < names.length; i++){
    nameOutput += names[i] + ", ";
  }
  outputElement.textContent = "The student names are: " + nameOutput;
}
//Add the names
function addNames(){
  if(namesAdded < MAXNUMBER){
  namesAdded++;
  names.push(nameInp.value);
  outputElement.textContent = nameInp.value +  " added succesfully.";
  } else {
    outputElement.textContent = "Oops, you can only add up to 5 names.";
  }
}
//Clear the array
function clearArray(){
  names.length = 0;
  namesAdded = 0;
  nameOutput = "";
  outputElement.textContent = "Array cleared.";
}
