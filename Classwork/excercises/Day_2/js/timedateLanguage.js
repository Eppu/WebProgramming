

let timebutton = document.getElementById("timeButton");
let datebutton = document.getElementById("dateButton");
let outputmsg =  document.getElementById("outputMessage");
let selectElem = document.getElementById("languageList");

let daysEnglish = new Array(7);
daysEnglish[0] = "Sunday";
daysEnglish[1] = "Monday";
daysEnglish[2] = "Tuesday";
daysEnglish[3] = "Wednesday";
daysEnglish[4] = "Thursday";
daysEnglish[5] = "Friday";
daysEnglish[6] = "Saturday";

let daysFinnish = new Array('sunnuntai','maanantai','tiistai','keskiviikko','torstai','perjantai','lauantai');
let monthsEnglish = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
let monthsFinnish = new Array('tammikuu','helmikuu','maaliskuu','huhtikuu','toukokuu','kesäkuu','heinäkuu','elokuu','syyskuu','lokakuu', 'marraskuu','joulukuu');

timebutton.addEventListener('click',displayTime);
datebutton.addEventListener('click',displayDate);

function displayTime() {
	let timeAndDateNow = new Date();
	let hours = timeAndDateNow.getHours();
	let mins = timeAndDateNow.getMinutes();
	let secs = timeAndDateNow.getSeconds();
	// make default value english
	let prefix = "Time is now: ";
	
	if(selectElem.value =='finnish'){
		prefix = "Kello on nyt: ";
	}	
	outputmsg.textContent = prefix + hours + ":" + mins + ":" + secs;
}

function displayDate() {
	let timeAndDateNow = new Date();
	let day = timeAndDateNow.getDay();
	let date = timeAndDateNow.getDate();
	let month = timeAndDateNow.getMonth();
	let year = timeAndDateNow.getFullYear();
	let dayName;
	let monthName;
	let prefix;
	// save the names of the day and the month
	if(selectElem.value =='english'){
		dayName = daysEnglish[day];
		monthName =  monthsEnglish[month];
		prefix = "Today is ";
	} else{
		dayName = daysFinnish[day];
		monthName =  monthsFinnish[month];
		prefix = "Tänään on ";
	}
	outputmsg.textContent = prefix + dayName + ",  "+ date +" " + monthName + " " + year;
	
}
