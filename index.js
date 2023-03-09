let imgForest;
let imgDragon;
let imgEnemy;
let dragon = {
    x: 300,
    y: 480,
    w: 83,
    h: 110
}
let enemies = [];
let fireballs = [];


function preload() {
    imgForest = loadImage('/img/forest-blurred.jpg');
  
    imgDragon = loadImage('/img/dragons-head.png');

    imgEnemy = loadImage('/img/knight.png');
  }

  function setup() {
    createCanvas(1200, 600);
    
  }

  function draw() {
    background(220);
    image(imgForest, 0, 0, 1200, 600);
    image(imgDragon, mouseX - 50, dragon.y, dragon.w, dragon.h);
    

    for (enemy of enemies) {
        enemy.y += 2;

        image(imgEnemy, enemy.x, enemy.y, enemy.w, enemy.h);
        noFill();
        noStroke();
        rect(enemy.x, enemy.y, enemy.w, enemy.h);
        // collide(fireBalls, enemy);
      }
    
    for (fireball of fireballs) {
        fireball.y -= 10;
        fill(255,0,0);
        stroke(255, 215, 0);
        circle(fireball.x, fireball.y, 20);
        
    }

    
    }   // end of draw function

    function createEnemy () {
        let obstacleW = 60;
        let enemy = {
              x: random(200, 1000 - obstacleW), // this way our enemy doesn't go past the right tree
              y: random(-200, 0),
              w: obstacleW,
              h: 60,
            }
            enemies.push(enemy);
          }
          setInterval(createEnemy, 1000);
    
    function mouseClicked() {
        let fireball = {
            x: mouseX,
            y: 500,
        }
        fireballs.push(fireball);
    }