//get references to html elements to display information
let nameElem = document.getElementById("studentname");
let imgElem = document.getElementById("studentimage");
let groupElem = document.getElementById("studentgroup");
let mark1Elem = document.getElementById("markone");
let mark2Elem = document.getElementById("marktwo");
let markElem = document.getElementById("averagemarks");
let pointsElem = document.getElementById("studypoints");
let gradeElem = document.getElementById("studentgrade");
let updateElem = document.getElementById("updatebutton");
let mark1Input = document.getElementById("mark1input");
let mark2Input = document.getElementById("mark2input");
let previousElem = document.getElementById("previousbutton");
let nextElem = document.getElementById("nextbutton");
let newStudent = document.getElementById("newstudentbutton");
let newStudentPanelElem = document.getElementById("newstudentpanel");
let newStudentNameElem = document.getElementById("newstudentname");
let newStudentGroupElem = document.getElementById("newstudentgroup");
let newStudentConfirmElem = document.getElementById("addstudentbutton");

updateElem.addEventListener('click', setCurrentStudentMarks);
previousElem.addEventListener('click', getPreviousStudent);
nextElem.addEventListener('click', getNextStudent);
newStudent.addEventListener('click', showNewStudentPanel);
newStudentConfirmElem.addEventListener('click', confirmNewStudent);

class Student {
  constructor(name, imagefile, group) {
    this.name = name;
    this.imagefile = imagefile;
    this.group = group;
    this._mark1 = 0;
    this._mark2 = 0;
    this._avgmark = 0;
    this._points = 0;
    this._grade = 0;
  }

  _calculateAverage() {
    this._avgmark = ((this._mark1 + this._mark2) / 2);
    return this._avgmark;
  }
  _calculateStudyPointsGrade() {

    if (this._mark1 == 0 || this._mark2 == 0 || this._avgmark < 40) {
      this._points = "0";
      this._grade = "0";
    } else if (this._avgmark >= 40 && this._avgmark <= 44) {
      this._points = "5";
      this._grade = "1";
    } else if (this._avgmark >= 45 && this._avgmark <= 54) {
      this._points = "5";
      this._grade = "2";
    } else if (this._avgmark >= 55 && this._avgmark <= 64) {
      this._points = "5";
      this._grade = "3";
    } else if (this._avgmark >= 65 && this._avgmark <= 74) {
      this._points = "5";
      this._grade = "4";
    } else if (this._avgmark >= 75 && this._avgmark <= 100) {
      this._points = "5";
      this._grade = "5";
    } else {
      alert("Whoops, something went wrong! Please double check your inputs.");
    }
    return this._points, this._grade;
  }
  //getters and setters. Not sure if I used these correctly.
  set mark1(mark1) {
    this._mark1 = mark1;
  }
  get mark1() {
    return this._mark1;
  }
  set mark2(mark2) {
    this._mark2 = mark2;
  }
  get mark2() {
    return this._mark2;
  }
} // end of Student class definition

//declare array of hotels
let allStudents = new Array();
let currentStudent = 0;
//(name,imagefile,group,mark1,mark2,avgmark,points,grade
allStudents[0] = new Student("Pekka", "pekka.jpg", "INTMEDIA17");
allStudents[1] = new Student("Mikko", "mikko.jpg", "16MEDIAART");
allStudents[2] = new Student("Liisa", "liisa.jpg", "INTMEDIA18");
allStudents[3] = new Student("Maikku", "maikku.jpg", "INTMEDIA17");
allStudents[4] = new Student("Poika", "poika.jpg", "16MEDIAART");
//update descriptions now that hotel objects have been created

//call this function when the page is loaded
showThisStudent(allStudents[currentStudent]);


function showThisStudent(studentObj) {
  //displays the properties of the hotel object passed as a parameter
  nameElem.textContent = studentObj.name;
  imgElem.src = "images/" + studentObj.imagefile;
  groupElem.textContent = studentObj.group;
  mark1Elem.textContent = "Mark 1: " + studentObj.mark1;
  mark2Elem.textContent = "Mark 2: " + studentObj.mark2;
  markElem.textContent = "Average mark: " + studentObj._avgmark;
  pointsElem.textContent = "Study points: " + studentObj._points;
  gradeElem.textContent = "Grade: " + studentObj._grade;
}

function setCurrentStudentMarks() {
  allStudents[currentStudent].mark1 = parseInt(mark1Input.value);
  allStudents[currentStudent].mark2 = parseInt(mark2Input.value);
  allStudents[currentStudent]._calculateAverage();
  allStudents[currentStudent]._calculateStudyPointsGrade();
  showThisStudent(allStudents[currentStudent]);
}

function getNextStudent() {
  if (currentStudent < (allStudents.length - 1)) {
    currentStudent += 1;
    showThisStudent(allStudents[currentStudent]);
  }
}

function getPreviousStudent() {
  if (currentStudent > 0) {
    currentStudent -= 1;
    showThisStudent(allStudents[currentStudent]);
  }
}

function showNewStudentPanel() {
  newStudentPanelElem.style.visibility = "visible";
}

function confirmNewStudent() {
  allStudents.push(new Student(newStudentNameElem.value, "newstudent" + allStudents.length + ".jpg", newStudentGroupElem.value));
  //Another, jankier way to do this ^
  //allStudents[allStudents.length] = new Student(newStudentNameElem.value, "newstudent" + allStudents.length + ".jpg" ,newStudentGroupElem.value);
  console.log("New student confirmed. Array length : " + allStudents.length);
  newStudentPanelElem.style.visibility = "hidden";
}