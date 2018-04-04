//initial variables
let canvasElem = document.getElementById("canvas");
let ctx = canvasElem.getContext("2d");

let ballMoving = false;
let userWon = false;
let timesCollided = 0;
maxYSpeed = 300;
let lives = 3;
let time = Date.now();
let keysDown = {};

//event listeners
window.addEventListener("keydown", function(e) {
  keysDown[e.key] = true;
});

window.addEventListener("keyup", function(e) {
  delete keysDown[e.key];
});

//the sprite class
class Sprite {
  constructor(x, y, width, height, xSpeed, ySpeed, colour) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.colour = colour;
    this.isVisible = true;
  }
}

//brick arrays and amounts
let brickAmount = 10;
let brickRowAmount = 3;
let brickRowOne = [];
let brickRowTwo = [];
let brickRowThree = [];

//make the bricks
function makeBrickRow(startY, thisBrickRow) {
  for (i = 0; i < brickAmount; i++) {
    thisBrickRow[i] = new Sprite((i * 64), startY, 64, 15, 0, 0, getRandomColour());
  }
}

//generate random colours for the bricks
function getRandomColour() {
  let letters = '0123456789ABCDEF';
  let colour = '#';
  for (var i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }
  return colour;
}

//create 3 rows of bricks
makeBrickRow(0, brickRowOne);
makeBrickRow(16, brickRowTwo);
makeBrickRow(32, brickRowThree);
//create the ball and paddle
let ballSprite = new Sprite(160, 200, 20, 20, 120, -100, "#cc0000");
let paddleSprite = new Sprite(280, 420, 80, 20, 200, 0, "#cccc00");

//count the total amount of bricks
let bricksAmount = brickRowOne.length + brickRowTwo.length + brickRowThree.length;

//game update function
function updateGameState(secs) {
  let minPermissableXvalue = 0;
  let maxPermissableXvalue = canvasElem.width - paddleSprite.width;

  //check if there are any bricks remaining
  if (bricksAmount != 0) {
    //left arrow key functionality
    if ("ArrowLeft" in keysDown) {
      // move paddle left if there is space to do so
      if (paddleSprite.x > minPermissableXvalue) {
        paddleSprite.x -= (paddleSprite.xSpeed * secs);
      }
    }
    //right arrow key functionality
    if ("ArrowRight" in keysDown) {
      // move paddle right if there is space to do so
      if (paddleSprite.x < maxPermissableXvalue) {
        paddleSprite.x += (paddleSprite.xSpeed * secs);
      }
    }
    if (ballMoving) {
      //update ball position
      ballSprite.x += ballSprite.xSpeed * secs;
      ballSprite.y += ballSprite.ySpeed * secs;

      //check collision with left wall
      if (ballSprite.x < 0) {
        ballSprite.xSpeed *= -1;
        ballSprite.x = 0;
      }
      // check collision with right wall
      if ((ballSprite.x + ballSprite.width) > canvasElem.width) {
        ballSprite.xSpeed *= -1;
        ballSprite.x = canvasElem.width - ballSprite.width;
      }

      // check collision with top
      if (ballSprite.y < 0) {
        ballSprite.ySpeed *= -1;
      }

      // check collision with the paddle. incrase the ball's ySpeed up to a certain point if the player has hit the ball 3 times in a row.
      if ((ballSprite.y + paddleSprite.height > paddleSprite.y) && (ballSprite.x >= paddleSprite.x) && (ballSprite.x <= (paddleSprite.x + paddleSprite.width))) {
        timesCollided++;
        if (timesCollided < 3) {
          ballSprite.ySpeed *= -1;
          ballSprite.y = paddleSprite.y - ballSprite.height;
        } else if (ballSprite.ySpeed < maxYSpeed) {
          ballSprite.ySpeed *= -1.5;
          timesCollided = 0;
        } else {
          ballSprite.ySpeed *= -1;
        }
      }
      //check collision with bricks
      function checkBrickCollision(thisBrickRow) {
        for (i = 0; i < thisBrickRow.length; i++) {
          if (thisBrickRow[i].isVisible) {
            if ((thisBrickRow[i].y + thisBrickRow[i].height > ballSprite.y) && (ballSprite.x >= thisBrickRow[i].x) && (ballSprite.x <= (thisBrickRow[i].x + thisBrickRow[i].width))) {
              ballSprite.ySpeed *= -1;
              thisBrickRow[i].isVisible = false;
              bricksAmount--;
              //display_status("Bricks left: " + bricksAmount);
            }
          }
        }
      }
      //check collision with the bricks
      checkBrickCollision(brickRowOne);
      checkBrickCollision(brickRowTwo);
      checkBrickCollision(brickRowThree);

      // check if ball outside bottom of game area
      if (ballSprite.y > canvasElem.height) {
        // set ballMoving = false if ball outside the game area
        ballMoving = false;
        //reduce lives by one
        lives--;
        //check if there are remaining lives. if not, display game over. if there are, display the remaining lives and reset the ball.
        if (lives != 0) {
          resetBallPos();
        }
      }
    }
  } else {
    //display_status("You win!");
    userWon = true;
  }
}
//reset the ball's position so that the game can continue
function resetBallPos() {
  ballSprite.ySpeed = -100;
  ballSprite.x = 160;
  ballSprite.y = 200;
  ballMoving = true;
}

function renderGame() {
  // draw the background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);

  //draw the bricks
  drawBrickRow(brickRowOne);
  drawBrickRow(brickRowTwo);
  drawBrickRow(brickRowThree);

  // draw the paddle sprite
  ctx.fillStyle = paddleSprite.colour;
  ctx.fillRect(paddleSprite.x, paddleSprite.y, paddleSprite.width, paddleSprite.height);

  // draw the ball sprite
  ctx.fillStyle = ballSprite.colour;
  ctx.fillRect(ballSprite.x, ballSprite.y, ballSprite.width, ballSprite.height);

  //draw the amount of lives
  ctx.fillStyle = "red";
  ctx.font = "18px Arial";
  ctx.fillText("Lives left: " + lives, 10, canvasElem.height - 10);

  //draw the amount of bricks left
  ctx.fillText("Bricks left: " + bricksAmount, canvasElem.width - 120, canvasElem.height - 10);

  //display either a winning or a losing message, depending on the state of the game
  if (userWon) {
    ctx.fillStyle = "#FCEA0C";
    ctx.font = "80px Arial";
    ctx.fillText("YOU WIN!", canvasElem.width / 2 - 200, canvasElem.height / 2 + 20);
  } else if (lives == 0) {
    ctx.fillStyle = "red";
    ctx.font = "80px Arial";
    ctx.fillText("GAME OVER...", 50, canvasElem.height / 2 + 20);
  }
}
//the brick drawing function
function drawBrickRow(thisBrickRow) {
  for (i = 0; i < thisBrickRow.length; i++) {
    if (thisBrickRow[i].isVisible) {
      ctx.fillStyle = thisBrickRow[i].colour;
      ctx.fillRect(thisBrickRow[i].x, thisBrickRow[i].y, thisBrickRow[i].width, thisBrickRow[i].height);
    }
  }
}

//run function
function run() {
  updateGameState((Date.now() - time) / 1000);
  renderGame();
  time = Date.now();
  //check if the playing conditions are met. if so, make the ball move.
  if (!userWon && (lives != 0)) {
    ballMoving = true;
  }
}

//Got help from Anthony's code with the splash screen. My brain couldn't figure this one out by itself for some reason!
let interval = 0;
startSplashScreen();
//draw the splash screen
function startSplashScreen() {
  //background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);
  //draw the head text
  ctx.fillStyle = "#E7DC08";
  ctx.font = "48px Courier";
  ctx.fillText("Get ready to break...", 30, canvasElem.height / 2);
  //draw the hit enter to play text
  ctx.fillStyle = "red";
  ctx.font = "18px Courier";
  ctx.fillText("Hit Enter to Start", 220, 350);
  //run the splash screen check every 10 milliseconds
  checkIntv = setInterval(checkSplashScreen, 10);
}

function checkSplashScreen() {
  //if the user presses enter, set the run function's interval to 10, causing the game to start!
  if ("Enter" in keysDown) {
    //clearInterval(checkIntv);
    //alert("Game started");
    checkIntv = setInterval(run, 10);
  }
}

function display_status(messagetoshow) {
  let st_line = document.getElementById("status_line");
  st_line.firstChild.nodeValue = messagetoshow;

}