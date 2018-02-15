let userInput = document.getElementById('newline');

let addButton = document.getElementById('add');
addButton.addEventListener('click', addItem);

let removeButton = document.getElementById('remove');
removeButton.addEventListener('click', removeItem);

function addItem() {
  //Magic
  let newEl = document.createElement('li');
  let newText = document.createTextNode(userInput.value);
  newEl.appendChild(newText);
  //Define the list
  let list = document.getElementsByTagName('ul')[0];
  //Insert the newEl element into the list
  list.insertBefore(newEl, list.childNodes[0]);
  //Set the input field to an empty string
  userInput.value = "";
}

function removeItem() {

}


// Howell's solution
// function addItem(){
//
// let itemToAdd = inputElem.value;
// let newListElem = document.createElement("li");
// let newTxtElem = document.create;
// newListElem.appendChild(newTxtElem);
//
// newListElem.className = "hot";
// newListElem.appendChild(newTxtElem);
//
// listElem[0].insertBefore(newListElem,listElem[0].childNodes[0]);
// }
