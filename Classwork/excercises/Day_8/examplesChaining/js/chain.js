
let button1Elem = document.getElementById("nochain");
button1Elem.addEventListener('click',showNoChain);
let button2Elem = document.getElementById("chain");
button2Elem.addEventListener('click',showChain);

let button3Elem = document.getElementById("clear");
button3Elem.addEventListener('click',function(){display_status(" ");});

class Student1{
	constructor(){
		this.firstName = "first not set";
		this.lastName  = "second not set";
	}
	setFirstName(value){
		this.firstName = value;
	}
	
	setLastName(value){
		this.lastName = value;
	}
	display(){
		display_status(this.firstName + " " + this.lastName);
	}
}

class Student2{
	constructor(){
		this.firstName = "first not set";
		this.lastName  = "second not set";
	}
	setFirstName(value){
		this.firstName = value;
		return this;
	}
	
	setLastName(value){
		this.lastName = value;
		return this;
	}
	display(){
		display_status(this.firstName + " " + this.lastName);
		return this;
	}
}
function showNoChain(){
 	let s1 = new Student1();
	s1.setFirstName("Beth");
	s1.setLastName("Hart");
	s1.display(); 			
}

function showChain(){
	let s2 = new Student2()
				.setFirstName("Joe")
				.setLastName("Bonamassa")
				.display();
}

function display_status(messagetoshow)
{
	var st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;
}