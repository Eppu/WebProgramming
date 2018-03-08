let canvas = document.getElementById("cv");
let ctx = canvas.getContext("2d");
let button = document.getElementById("button1");

button.addEventListener("click", drawEverything);

function drawCircle() {
  ctx.beginPath();
  ctx.arc(100, 100, 30, 0, 2 * Math.PI);
  ctx.fill();
}

function drawUnfTriangle() {
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(350, 150);
  ctx.lineTo(200, 200);
  ctx.closePath();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 5;
  ctx.stroke();
}

function drawTriangle(){
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(350, 150);
  ctx.lineTo(200, 200);
  ctx.closePath();
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 5;
  ctx.stroke();
}

function drawTriangleAndCircle(){
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(350, 150);
  ctx.lineTo(200, 200);
  ctx.closePath();
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(100, 100, 30, 0, 2 * Math.PI);
  ctx.fill();
}

function drawEverything(){
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(350, 150);
  ctx.lineTo(200, 200);
  ctx.closePath();
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(100, 100, 30, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "green";
  ctx.font = "36px Arial";

  // draw the text at current location in textX and textY
  ctx.fillText("TAMK",300,240);
}
