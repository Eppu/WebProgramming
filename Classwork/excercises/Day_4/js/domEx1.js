
let changeButton = document.getElementById('change');
changeButton.addEventListener('click', changeClass);

function changeClass(){
  let x = document.getElementsByClassName("hot");
  x[2].textContent += " from Finland";
  x[2].className = "cool";
}
