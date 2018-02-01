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
let allStudents = new Array();

//Add event listeners
studentBtn.addEventListener("click", calculateGrade);
showStudentsBtn.addEventListener("click", showStudentList);
clearBtn.addEventListener("click", emptyArray);


//Calculate and store the correct grade. If the amount of students is over 5, output an error message.
function calculateGrade(){
if(students < 5)
{
  students++;
  let mark1 = markOne.value;
  let mark2 = markTwo.value;
  avgMark = (parseFloat(mark1) + parseFloat(mark2)) / 2;

  if (mark1 == 0 || mark2 == 0 || avgMark < 40){
    studyPoints = "0";
    grade = "0";
  } else if(avgMark >= 40 && avgMark <= 44){
    studyPoints = "5";
    grade = "1";
  } else if(avgMark >= 45 && avgMark <= 54){
    studyPoints = "5";
    grade = "2";
  } else if (avgMark >= 55 && avgMark <= 64){
    studyPoints = "5";
    grade = "3";
  } else if (avgMark >= 65 && avgMark <= 74){
    studyPoints = "5";
    grade = "4";
  } else if (avgMark >= 75 && avgMark <= 100){
    studyPoints = "5";
    grade = "5";
  }
  allStudents.push(student.value + ": First Mark: " + mark1 + ", Second Mark "
       + mark2 + ", Average: " + avgMark + ", Study Points: " + studyPoints + ", Grade: " + grade);

    output.textContent = student.value + " was added.";
  } else {
    output.textContent = student.value + " NOT added! Only 5 students permitted."
}
}

function showStudentList(){
  for(let i = 0; i < students; i++){
    msg += allStudents[i] + "<br>";
  }
  output.innerHTML = msg;
}
