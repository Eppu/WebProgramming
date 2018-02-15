class Student{
  constructor(name, age){
    this._name = name;
    this._age = age;
    this._mark1 = 0;
    this._mark2 = 0;
  }

  set mark1(mark){
    if((mark >= 0 ) && (mark <= 100)){
      this._mark1 = mark;
    }
  }
  get name(){
    return this._name.toUpperCase();
  }
}


let s1 = new Student("Eetu", 20);

s1.mark1 = 999;
let person = s1.name;






//REMEMBER THESE
this._name = name;
this._imagefile = imagefile;
this._group = group;
this._mark1 = 0;
this._mark2 = 0;
this._average = 0;
this._points = 0;
this._grade = 0;

//using functions to implement getters and setters
set mark1(val){
  this._mark1 = val;
  this._calculatedGrade();
}
set mark2(val){
  this._mark1 = val;
  this._calculatedGrade();
}

get mark1()}{
  return this._mark1;
}
get mark2(){
  reutnr this._mark2;
}



_calculateGrade(){
  let grade = 0, points = 5;
  this._avergae = (this._mark1  + this._mark2) / 2);

  if((this._mark1 < 40) || (this._mark2 < 40)){
    points = 0;
  } else if ((this._average >= 40) && (this._average < 45)){
    grade = 1;
  } else if ((this._average >= 45) && (this._average < 55)){
      grade = 2;
  } else if ((this._average >= 55) && (this._average < 65)){
    grade = 3;
  } else if ((this._average >= 65) && (this._average < 75)){
    grade = 4;
  } else if ((this._average >= 75) && (this._average <= 100)){
    grade = 5;
  }
  this._points = points;
  this._grade = grade;
}
