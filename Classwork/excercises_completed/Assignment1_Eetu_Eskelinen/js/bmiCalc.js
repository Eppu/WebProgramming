//Declare constants and HTML element references
const INCHES_TO_METRES = 39.3700787;
const LBS_TO_KG = 2.20462;
let height = document.getElementById("userheight");
let weight = document.getElementById("userweight");
let heightUnits = document.getElementById("heighttype");
let weightUnits = document.getElementById("weighttype");
let submitBtn = document.getElementById("sendbutton");
let outputMsg = document.getElementById("output");
let outputComment = document.getElementById("comment");

//Add event listeners
submitBtn.addEventListener("click", calculateBMI);

function calculateBMI() {
  height = height.value;
  weight = weight.value;
  console.log(height);
  console.log(weight);

  //If units are not in metric, convert them to metric values
  if (heightUnits == "inches") {
    height /= INCHES_TO_METRES;
  }
  if (weightUnits == "lbs") {
    weight /= LBS_TO_KG;
  }
  //Calculate the BMI
  //weight (kg) ÷ height2 (m2)s
  let userBMI = (weight / (height * height));
  console.log(userBMI);

  outputMsg.textContent = "Your current BMI is " + Math.round(userBMI, 1) + ".";

  if (userBMI < 18.5) {
    outputComment.textContent = "You are underweight. Eat more!";
  } else if (userBMI >= 18.5 && userBMI <= 24.9) {
    outputComment.textContent = "You are normal weight. Keep it up!";
  } else if (userBMI >= 25 && userBMI <= 29.9) {
    outputComment.textContent = "You are overweight. Watch your portions and get some excercise!";
  } else if (userBMI > 30) {
    outputComment.textContent = "You are obese. Please get in touch with a doctor!";
  } else {
    alert("Whoops! Something went wrong. Make sure that you put everything in correctly!");
  }

  //set height, weight and BMI to 0, in case the user wants to run the program a second time
}
