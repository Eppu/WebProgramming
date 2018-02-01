let inputElem = document.getElementById("tableValue");
let buttonElem = document.getElementById("showButton");
let outputElem = document.getElementById("outputMsg");

buttonElem.addEventListener('click',generateTable);

function generateTable(){
	let msg = "";
	//let tableValue = 8;

	//get the value from the inputfield and convert to an Integer
	let tableValue = parseInt(inputElem.value);


	// check the value is between 1 and 12, if not give an error message
	if(tableValue >= 1 && tableValue <= 12){
	//loop for 12 times
	for(let i = 1; i <= 12; i++){
	// create a string corresponding to each line in the multiplication table ending in  "<br>"
	 //msg +=  ??
	 msg += i + " * " + tableValue + " = " + i * tableValue + "<br>";
	}
	// assign the string to the innerHTML property of the <p> element
	//msg += "item 1 <br> item 2 <br> item 3<br>";
	outputElem.innerHTML = msg;
	}
	else{
		outputElem.innerHTML = "Error! Input an integer between 1 and 12. "
	}
}
