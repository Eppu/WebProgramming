

let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');

// set line colour and width
context.strokeStyle = '#ff0000';
context.lineWidth = 3;

//create the path
context.beginPath();
context.moveTo(100, 150);
context.lineTo(450, 50);

//draw the line
context.stroke();
