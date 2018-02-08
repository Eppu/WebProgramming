	let
	 number1 = 23,
	 number2 = 16,
	 number3 = 14;

	let numbers = [12,34,25,-6,5];

	 let outputElem = document.getElementById('outputMessage');
	 //outputElem.textContent = "Smallest is "+ minimum(number1,number2,number3);
	 //outputElem.textContent = "Smallest is "+ + minimumOfArray(numbers);
	 //outputElem.textContent = "Smallest of " + arrayToString(numbers) + " is "+ minimumOfArray(numbers);

	function minimum (a,b,c){
		// return the smallest of the 3 parameters
		// assume these are all Numbers

		return Math.min(a,b,c);
	}
	 function minimumOfArray(arrOfNumbers){
		 // return the smallest value in the array
		 //  assume all array elements are all Numbers
		 // if array length is 0, then return 'undefined'

		 if(arrOfNumbers.length != 0){
			 return Math.min(...arrOfNumbers);
		 } else {
			 return undefined;
		 }
	 }

	 function arrayToString(arrOfNumbers){
		//return a string containing each of the items in the array separated by a comma and a space
		// if array length is 0, then return an empty string
		let text = "";
		if(arrOfNumbers.length != 0){
			for (i = 0; i < arrOfNumbers.length; i++) {
    	text += arrOfNumbers[i] + ", ";
		}
		return text;
		} else {
			return "";
		}
	 }
