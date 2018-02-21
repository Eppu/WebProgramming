//Declare constants and HTML element references
const INCHES_TO_METRES = 39.3700787;
const LBS_TO_KG = 2.20462;

let heightUnits = document.getElementById("heighttype");
let weightUnits = document.getElementById("weighttype");
let submitBtn = document.getElementById("sendbutton");
let outputMsg = document.getElementById("output");
let outputComment = document.getElementById("comment");

//Add event listeners
submitBtn.addEventListener("click", calculateBMI);

function calculateBMI() {
  //Get the height and weight values based on user input
  let height = document.getElementById("userheight").value;
  let weight = document.getElementById("userweight").value;

  //Check that the height and weight are positive numbers
  if ((height > 0) && (weight > 0)) {
    //If units are not in metric, convert them to metric values
    if (heightUnits.value == "inches") {
      height /= INCHES_TO_METRES;
    }
    if (weightUnits.value == "lbs") {
      weight /= LBS_TO_KG;
    }
    //Calculate the BMI
    let userBMI = (weight / (height * height));
    //Round the BMI to the accuracy of one decimal
    userBMI = Math.round( userBMI * 10 ) / 10;
    //Output the BMI
    outputMsg.textContent = "Your current BMI is " + userBMI + ".";
    //Use this for testing
    //console.log("BMI: " + userBMI + ", Height: " + height + ", Weight: " + weight);

    if (userBMI < 18.5) {
      outputComment.textContent = "You are underweight. Eat more!";
    } else if (userBMI >= 18.5 && userBMI <= 24.9) {
      outputComment.textContent = "You are normal weight. Keep it up!";
    } else if (userBMI >= 25 && userBMI <= 29.9) {
      outputComment.textContent = "You are overweight. Watch your portions and get some excercise!";
    } else if (userBMI >= 30) {
      outputComment.textContent = "You are obese. Please get in touch with a doctor!";
    }
  } else {
    //If height or weight are negative, throw an error window.
    alert("Whoops! Something went wrong. Make sure that you put everything in correctly!");
  }
}
