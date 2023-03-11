const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const startScreen = document.getElementById('game-intro');
const gameOverScreen = document.getElementById('game-over');
let scoreGameOver = document.getElementById('score');

let canvas;
let imgForest;
let imgDragon;
let imgEnemy;
let imgSheep;
let imgMessage;
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
    imgForest = loadImage('/img/bg-blurred-with-frame.png');
  
    imgDragon = loadImage('/img/dragons-head.png');

    imgEnemy = loadImage('/img/knight.png');

    imgSheep = loadImage('/img/sheep.png');

    imgMessage = loadImage('/img/message-frame.png');

  } // end of preload function

  function setup() {
    canvas = createCanvas(1200, 600);
    canvas.hide();
    gameOverScreen.style.display = "none";
    noLoop();

    
    
  } // end of setup function

  function draw() {
    background(220);
    image(imgForest, 0, 0, 1200, 600);
    image(imgDragon, mouseX - 50, dragon.y, dragon.w, dragon.h);
    
    // score counter while game on
  textFont('Optima');
  fill(241, 226, 200);
  textSize(32);
  text('Score: ', 240, 40, 20, 40);
  text(scoreCounter, 340, 40, 20, 40);

  fireballShot();
  enemyBreach();
  stopFireballs();
  sheepPointsUp();
  // levelUp();

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
  noLoop();
  startScreen.style.display = "none";
  canvas.hide();
  gameOverScreen.style.display = "block";
  scoreGameOver = document.getElementById('score');
  console.log(scoreGameOver, scoreCounter);
  scoreGameOver.innerText = scoreCounter;
  
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
    y: random(0, -400),
    w: enemyW,
    h: 60,
  }
    enemiesArray.push(enemy);
}

function createSheep () {
  let sheepW = 60;
  let sheep = {
    x: random(200, 1000 - sheepW), // this way our enemy doesn't go past the right tree
    y: random(0, -400),
    w: sheepW,
    h: 60,
  }
  sheepArray.push(sheep);
}

// it has to be called in draw() but then it does crazy stuff
function levelUp () {
  if (scoreCounter >= 10 && scoreCounter < 30) {
    setInterval(createEnemy, 2000); // speed of knights coming down
    setInterval(createSheep, 4000); // speed of sheep coming down

  } else if (scoreCounter >= 30 && scoreCounter < 50) {
    setInterval(createEnemy, 1500); 
    setInterval(createSheep, 2000); 

  } else if (scoreCounter >= 50) {
    setInterval(createEnemy, 1000); 
    setInterval(createSheep, 1000);
  }
}

// NORMAL JS
startButton.onclick = () => {
  startGame();
};

restartButton.onclick = () => {
  startGame();
  console.log('resart');
};

// when we click start button, start screen is hidden and we see the canvas
function startGame() {
  enemiesArray = [];
  sheepArray = [];
  fireballsArray = [];
  scoreCounter = 0;
  setInterval(createEnemy, 2500); // speed of knights coming down
  setInterval(createSheep, 5000); // speed of sheep coming
  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  canvas.show();
  canvas.position(0,75);
  canvas.center("horizontal");
  levelUp();
  loop();
  
}