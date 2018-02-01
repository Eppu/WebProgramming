//Declare HTML element references
let buttonElement = document.getElementById("nameButton");
let outputElement = document.getElementById("outputMessage");
let names = ["Kari", "Leena", "Sofia", "Jari", "Hilpa"];
let nameOutput = "";
//Event listeners
buttonElement.addEventListener("click", outputNames);
//Loop through the names array, add each name to the nameOutput string. Then output the names.
function outputNames(){
  for(let i = 0; i < names.length; i++){
    nameOutput += names[i] + ", ";
  }
  outputElement.textContent = "The student names are: " + nameOutput;
}
