let imgForest;
let imgDragon;
let imgEnemy;
let dragon = {
    x: 300,
    y: 480,
    w: 83,
    h: 110
}
let enemiesArray = [];
let fireballsArray = [];
let scoreCounter = 0;


function preload() {
    imgForest = loadImage('/img/forest-blurred.jpg');
  
    imgDragon = loadImage('/img/dragons-head.png');

    imgEnemy = loadImage('/img/knight.png');
  } // end of preload function

  function setup() {
    createCanvas(1200, 600);
    
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
  enemyBreach(enemiesArray);

    for (enemy of enemiesArray) {
        enemy.y += 2;

        image(imgEnemy, enemy.x, enemy.y, enemy.w, enemy.h);
        noFill();
        noStroke();
        rect(enemy.x, enemy.y, enemy.w, enemy.h);
        // collide(fireBalls, enemy);
      }
    
    for (fireball of fireballsArray) {
        fireball.y -= 10;   // speed of fireballs
        fill(255,0,0);
        stroke(255, 215, 0);
        circle(fireball.x, fireball.y, 20);
        
    }

    
    }   // end of draw function


 // fireball-knight collision: when a fireball touches the enemy it'll remove both, the fireball and the enemy and add a point to score
 function fireballShot () {
  for (enemy of enemiesArray) {
    for (fireball of fireballsArray) {
      if (dist(enemy.x, enemy.y, fireball.x, fireball.y) < 40) {
        enemiesArray.splice(enemiesArray.indexOf(enemy), 1);
        fireballsArray.splice(fireballsArray.indexOf(fireball), 1);
        scoreCounter++;
      }
    }
  }
}

// if a knight passess the bottom line of the canvas, game over
function enemyBreach () {
  if (enemy.y > 600) {
    gameOver();
    return true;
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

// creating fireballs with a mouse click
function mouseClicked() {
  let fireball = {
    x: mouseX,
    y: 500,
  }
    fireballsArray.push(fireball);
}

function createEnemy () {
  let obstacleW = 60;
  let enemy = {
    x: random(200, 1000 - obstacleW), // this way our enemy doesn't go past the right tree
    y: -50,
    w: obstacleW,
    h: 60,
  }
    enemiesArray.push(enemy);
}
setInterval(createEnemy, 2500); // speed of knights coming down