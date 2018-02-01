//Declare refrences to the HTML elements
let inputField = document.getElementById("textBox");
let myButton = document.getElementById("greetButton");
let outputMsg = document.getElementById("outputMessage");

//Set up the event listener
myButton.addEventListener('click', displayGreeting);

//Define the event handling function
function displayGreeting () {
  //change the textContent property of the paragraph object
  outputMsg.textContent = "Hello " + inputField.value + "!";
}
