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
let sheepSpawnBuffer;
let sheepSpawnDifficulty;
let enemySpawnBuffer;
let enemySpawnDifficulty;

let fireballSound;
let gameOverSound;
let battleMusic;


function preload() {
    imgForest = loadImage('img/bg-blurred-with-frame.png');
  
    imgDragon = loadImage('img/dragons-head.png');

    imgEnemy = loadImage('img/knight.png');

    imgSheep = loadImage('img/sheep.png');

    imgMessage = loadImage('img/message-frame.png');

    fireballSound = loadSound('audio/fireball-sound.wav');

    gameOverSound = loadSound('audio/game-over.wav');

    battleMusic = loadSound('audio/battle-music.wav');

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
  levelUp();
  sheepSpawnBuffer++;
  if (sheepSpawnBuffer % sheepSpawnDifficulty === 1) {
    createSheep();
  }

  enemySpawnBuffer++;
  if (enemySpawnBuffer % enemySpawnDifficulty === 1) {
    createEnemy();
  }

  for (enemy of enemiesArray) {
    enemy.y += 2;

    image(imgEnemy, enemy.x, enemy.y, enemy.w, enemy.h);
    noFill();
    noStroke();
    rect(enemy.x, enemy.y, enemy.w, enemy.h);
  }

  for (sheep of sheepArray) {
    sheep.y += 2;

    image(imgSheep, sheep.x, sheep.y, sheep.w, sheep.h);
    noFill();
    noStroke();
    rect(sheep.x, sheep.y, sheep.w, sheep.h);
  }
    
  for (fireball of fireballsArray) {
        fireball.y -= 15;   // speed of fireballs
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

// what happens when sheep isn't shot and leaves the screen = scoreCounter++
function sheepPointsUp() {
  for (sheep of sheepArray) {
    if (sheep.y >= 600) {
      sheepArray.splice(sheepArray.indexOf(sheep), 1);
      scoreCounter++;
    }
  }
}

function gameOver () {
  noLoop();
  battleMusic.stop();
  gameOverSound.play();
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
  fireballSound.play();

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
    enemySpawnDifficulty = 60; // speed of knights coming down
    sheepSpawnDifficulty = 120;

  } else if (scoreCounter >= 30 && scoreCounter < 50) {
    enemySpawnDifficulty = 30; 
    sheepSpawnDifficulty = 60; 

  } else if (scoreCounter >= 50) {
    enemySpawnDifficulty = 10; 
    sheepSpawnDifficulty = 10;
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
  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  canvas.show();
  canvas.position(0,75);
  canvas.center("horizontal");
  battleMusic.play();
  battleMusic.loop();
  levelUp();
  sheepSpawnBuffer = 0;
  sheepSpawnDifficulty = 180;
  enemySpawnBuffer = 0;
  enemySpawnDifficulty = 120;
  loop();
 
}