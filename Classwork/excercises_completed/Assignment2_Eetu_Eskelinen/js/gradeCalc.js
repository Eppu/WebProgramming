//Sorry, didn't have much time to work on this during the ski break. The code is pretty messy, but it works.

//Declare HTML element references and variables
let student = document.getElementById("studentName");
let markOne = document.getElementById("firstMark");
let markTwo = document.getElementById("secondMark");
let studentBtn = document.getElementById("addStudentButton");
let showStudentsBtn = document.getElementById("showAllStudentsButton");
let clearBtn = document.getElementById("clearArrayButton");
let output = document.getElementById("pointsOutput");
let students = 0;
let maxStudents = 5;
let avgMark = 0.0;
let studyPoints = "";
let grade = "";
let msg = "";
let marksValid = true;
let allStudents = new Array();

//Add event listeners
studentBtn.addEventListener("click", calculateGrade);
showStudentsBtn.addEventListener("click", showStudentList);
clearBtn.addEventListener("click", clearArray);

//Calculate the grade.
function calculateGrade() {
  if (students < maxStudents) {
    let mark1 = markOne.value;
    let mark2 = markTwo.value;
    avgMark = (parseFloat(mark1) + parseFloat(mark2)) / 2;
    if (mark1 == 0 || mark2 == 0 || avgMark < 40) {
      studyPoints = "0";
      grade = "0";
    } else if (avgMark >= 40 && avgMark <= 44) {
      studyPoints = "5";
      grade = "1";
    } else if (avgMark >= 45 && avgMark <= 54) {
      studyPoints = "5";
      grade = "2";
    } else if (avgMark >= 55 && avgMark <= 64) {
      studyPoints = "5";
      grade = "3";
    } else if (avgMark >= 65 && avgMark <= 74) {
      studyPoints = "5";
      grade = "4";
    } else if (avgMark >= 75 && avgMark <= 100) {
      studyPoints = "5";
      grade = "5";
    }
    //Check if both marks are valid. if not, tell the user which one isn't. Also check if the user has typed in a name for the student.
    if (mark1 < 0 || mark1 > 100 || !mark1) {
      output.textContent = "Mark 1 is invalid. Make sure the number is between 0 and 100.";
    } else if (mark2 < 0 || mark2 > 100 || !mark2) {
      output.textContent = "Mark 2 is invalid. Make sure the number is between 0 and 100.";
    } else if (student.value == "") {
      output.textContent = "Student name missing. Make sure to add a name for the student.";
    } else {
      students++;
      //Push the result into the allStudents array
      allStudents.push(student.value + ": First Mark: " + mark1 + ", Second Mark " +
        mark2 + ", Average: " + avgMark + ", Study Points: " + studyPoints + ", Grade: " + grade);
      //Output a message saying the student was added.
      output.textContent = student.value + " was added.";
    }
  } else {
    //If the amount of students is over 5, output an error message.
    output.textContent = student.value + " NOT added! Only 5 students permitted."
  }
}
//Show a list of the students stored in the allStudents array.
function showStudentList() {
  //This is used to clear the msg before we display the array
  msg = "";
  //Check if there are any students in the array. if not, display an error message. If there are students in the array, run the loop.
  if (allStudents.length) {
    for (let i = 0; i < students; i++) {
      msg += allStudents[i] + "<br>";
    }
    output.innerHTML = msg;
  } else {
    output.innerHTML = "The array is empty.";
  }
}
//Set the allStudents array's length to 0, and reset the student counter. Output a message telling what's been done.
function clearArray() {
  allStudents.length = 0;
  students = 0;
  output.textContent = "Array cleared.";
}