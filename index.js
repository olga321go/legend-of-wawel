const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('game-intro');

let canvas;
let imgForest;
let imgDragon;
let imgEnemy;
let imgSheep;
let dragon = {
    x: 300,
    y: 480,
    w: 83,
    h: 110
}
let enemiesArray = [];
let fireballsArray = [];
let sheepArray = [];
let scoreCounter = 0;


function preload() {
    imgForest = loadImage('/img/forest-blurred.jpg');
  
    imgDragon = loadImage('/img/dragons-head.png');

    imgEnemy = loadImage('/img/knight.png');

    imgSheep = loadImage('/img/sheep.png');

  } // end of preload function

  function setup() {
    canvas = createCanvas(1200, 600);
    canvas.hide();
    
  } // end of setup function

  function draw() {
    background(220);
    image(imgForest, 0, 0, 1200, 600);
    image(imgDragon, mouseX - 50, dragon.y, dragon.w, dragon.h);
    
    // score counter while game on
  textSize(32);
  fill(255,255,255);
  text('Score: ', 75, 10, 20, 40);
  text(scoreCounter, 180, 10, 20, 40);

  fireballShot();
  enemyBreach();
  stopFireballs();
  sheepPointsUp();

  for (enemy of enemiesArray) {
    enemy.y += 2;

    image(imgEnemy, enemy.x, enemy.y, enemy.w, enemy.h);
    noFill();
    noStroke();
    rect(enemy.x, enemy.y, enemy.w, enemy.h);

    // for enemies to not be displayed on game over screen but sth is wrong
  //   enemy.update();
  //   enemy.draw();
  //   if (enemyBreach()) { 
  //    gameOver()
  //    return; 
  // }
  }

  for (sheep of sheepArray) {
    sheep.y += 2;

    image(imgSheep, sheep.x, sheep.y, sheep.w, sheep.h);
    noFill();
    noStroke();
    rect(sheep.x, sheep.y, sheep.w, sheep.h);
  }
    
  for (fireball of fireballsArray) {
        fireball.y -= 10;   // speed of fireballs
        fill(255,0,0);
        stroke(255, 215, 0);
        circle(fireball.x, fireball.y, 20);
        
  }

}   // end of draw function




// fireball-knight collision: when a fireball touches the enemy it'll remove both, the fireball and the enemy and add a point to score
function fireballShot() {
  for (enemy of enemiesArray) {
    for (fireball of fireballsArray) {
      if (dist(enemy.x, enemy.y, fireball.x, fireball.y) < 60) {
        enemiesArray.splice(enemiesArray.indexOf(enemy), 1);
        fireballsArray.splice(fireballsArray.indexOf(fireball), 1);
        scoreCounter++;
      }
    }
  }

  for (sheep of sheepArray) {
    for (fireball of fireballsArray) {
      if (dist(sheep.x, sheep.y, fireball.x, fireball.y) < 60) {
        sheepArray.splice(sheepArray.indexOf(sheep), 1);
        fireballsArray.splice(fireballsArray.indexOf(fireball), 1);
        scoreCounter--;
      }
    }
  }
}

// what happens when sheep isn't shot and leaves the creen = scoreCounter++
function sheepPointsUp() {
  for (sheep of sheepArray) {
    if (sheep.y === 600) {
      scoreCounter++;
    }
  }

}

function gameOver () {
  redraw();
  background(0, 0, 0);
  text('! GAME OVER !', 130, 160, 300, 300);
  text('Your score is:', 150, 190, 300, 300);
  text(scoreCounter, 230, 225, 20, 40);
  noLoop();
}

// if a knight passess the bottom line of the canvas, game over
function enemyBreach() {
  for (enemy of enemiesArray) {
    if (enemy.y > 600) {
      gameOver();
      return true;
    }
  }
}


// fireballs that go past the screen won't by accident shoot sth that is yet to appear on the screen
function stopFireballs() {
  for (fireball of fireballsArray) {
    if (fireball.y < 0) {
      fireballsArray.splice(fireballsArray.indexOf(fireball), 1);
    }
  }
}


// creating fireballs with a mouse click
function mouseClicked() {
  let fireball = {
    x: mouseX,
    y: 500,
  }
    fireballsArray.push(fireball);
}

function createEnemy () {
  let enemyW = 60;
  let enemy = {
    x: random(200, 1000 - enemyW), // this way our enemy doesn't go past the right tree
    y: -50,
    w: enemyW,
    h: 60,
  }
    enemiesArray.push(enemy);
}
setInterval(createEnemy, 2500); // speed of knights coming down

function createSheep () {
  let sheepW = 60;
  let sheep = {
    x: random(200, 1000 - sheepW), // this way our enemy doesn't go past the right tree
    y: -50,
    w: sheepW,
    h: 60,
  }
  sheepArray.push(sheep);
}
setInterval(createSheep, 5000); // speed of sheep coming

// NORMAL JS
startButton.onclick = () => {
  startGame();
};

// when we click start button, start screen is hidden and we see the canvas
function startGame() {
  startScreen.style.display = "none";
  canvas.show();
}