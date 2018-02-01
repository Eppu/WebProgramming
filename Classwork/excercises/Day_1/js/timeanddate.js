//Declare HTML element references
let timeBtn = document.getElementById("timeButton");
let dateBtn = document.getElementById("dateButton");
let outputMsg = document.getElementById("outputMessage");
let userSelection = document.getElementById("langSelect")
let pageTitle = document.getElementById("title");

//Declare day and month arrays
let dayEnglish = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let monthEnglish = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let dayFinnish = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"];
let monthFinnish = ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toutkokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"];

//Declare event listeners
timeBtn.addEventListener('click', displayTime);
dateBtn.addEventListener('click', displayDate);
userSelection.addEventListener('change', changeButtonText);

//Change the text of the button according to the user selection
function changeButtonText(){
  if(userSelection.value == "finnish")
  {
    timeBtn.innerText = "Näytä aika";
    dateBtn.innerText = "Näytä päivä";
    pageTitle.innerText = "Näytä päivä tai aika";
  }
  else
  {
    timeBtn.innerText = "Show time";
    dateBtn.innerText = "Show date";
    pageTitle.innerText = "Show Date or Time";
  }
}
//Declare the time function
function displayTime(){
  let timeAndDateNow = new Date();
  let hours = timeAndDateNow.getHours();
  let mins = timeAndDateNow.getMinutes();
  let secs = timeAndDateNow.getSeconds();
  if(userSelection.value == "english")
  {
  outputMsg.textContent = "The time now is: " + hours + ":" + mins + ":" + secs;
  }
  else
  {
    outputMsg.textContent = "Kello on nyt: " + hours + ":" + mins+ ":" + secs;
  }
}

//Declare the date function
function displayDate(){
    let timeAndDateNow = new Date();
    let day = timeAndDateNow.getDay();
    let date = timeAndDateNow.getDate();
    let month = timeAndDateNow.getMonth();
    let year = timeAndDateNow.getFullYear();
    //If the user has selected english, output the day and month in english
    if(userSelection.value == "english")
    {
      outputMsg.textContent = "Today is " + dayEnglish[day] + ", " + date + "/" + monthEnglish[month] + "/" + year;
    }
    //If the user has selected something else (finnish), output the day and month in finnish
    else
    {
      outputMsg.textContent = "Tänään on " + dayFinnish[day] + ", " + date + " " + monthFinnish[month] + "ta " + year;
    }
}
