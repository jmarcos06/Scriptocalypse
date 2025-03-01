
const gameIntro = document.getElementById('game-intro');
const gameArea = document.getElementById("gameArea");
const player = document.getElementById('player');
const gameEnd = document.getElementById('game-end');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const score = document.getElementById('score');
//const lives = document.getElementById('lives');
var sec = 0;
var min = 0;
var intervalTimer;
lives = 3;

// Setup  Game Intro state
function introPage() {
    gameIntro.style.display = 'block';
    gameArea.style.display = 'none';
    gameEnd.style.display = 'none';
    //stats.style.display = 'block';
  }
  
  // run the game when start button is pressed
function startGame() { 
  startButton.addEventListener('click', () => {
    gameIntro.style.display = 'none';
    gameArea.style.display = 'block';
    gameEnd.style.display = 'none';   
    stats.style.display = 'block';
    intervalTimer = setInterval(timeGame,1000)



//Game Time
function timeGame(){
    sec++

    sec = sec < 10 ? "0" + sec : sec;
    if(sec==60){
        min++
        sec=0
    }
    document.getElementById('timer').innerText='Time elapsed:'+min+':'+sec
    };

  
    // here will run the game
    let playerY = window.innerHeight / 2 - 25;
        player.style.bottom = playerY + "px";

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp" && playerY < window.innerHeight - 60) {
                playerY += 40;
            } else if (e.key === "ArrowDown" && playerY > 0) {
                playerY -= 40;
            } else if (e.key === " ") {
                shoot();
            }
            player.style.bottom = playerY + "px";
        });

        function shoot() {
            const bullet = document.createElement("div");
            bullet.classList.add("bullet");
            gameArea.appendChild(bullet);
            bullet.style.left = "60px";
            bullet.style.bottom = playerY + 20 + "px";
            
            let bulletInterval = setInterval(() => {
                let bulletX = bullet.offsetLeft;

                let checkShoot = document.querySelectorAll(".enemy");
                checkShoot.forEach(enemy => {
                    checkCollision(bullet, enemy);
                });

                let checkPlayerColision = document.querySelectorAll(".enemy");
                checkPlayerColision.forEach(enemy => {
                    checkCollisionEnemy(player, enemy);
                });


                if (bulletX > window.innerWidth) {
                    bullet.remove()
                    clearInterval(bulletInterval);
                } else {
    
                   bullet.style.left = bulletX + 10 + "px";
                }
            }, 20);
        }
       
        function spawnEnemy() {
            const enemy = document.createElement("div");
            enemy.classList.add("enemy");
            gameArea.appendChild(enemy);
            enemy.style.right = "0px";
            enemy.style.bottom = Math.random() * (window.innerHeight - 50) + "px";
            
            let enemyInterval = setInterval(() => {
                let enemyX = enemy.offsetLeft;
                if (enemyX < 0) {
                    enemy.remove();
                    clearInterval(enemyInterval);
                } else {
                    enemy.style.right = parseInt(enemy.style.right) + 10 + "px";
                }
            }, 50);
            
            setTimeout(spawnEnemy, Math.random() * 200 + 100);
        }
        
        spawnEnemy();

        function checkCollision(bullet, enemy) {
            if (bullet.offsetLeft < enemy.offsetLeft + enemy.offsetWidth &&
                bullet.offsetLeft + bullet.offsetWidth > enemy.offsetLeft &&
                bullet.offsetTop < enemy.offsetTop + enemy.offsetHeight &&
                bullet.offsetTop + bullet.offsetHeight > enemy.offsetTop) {
                    

                bullet.remove();
                enemy.remove();
                score.innerText ++;


            }
        }
        function checkCollisionEnemy(player, enemy) {
            if (player.offsetLeft < enemy.offsetLeft + enemy.offsetWidth &&
                player.offsetLeft + player.offsetWidth > enemy.offsetLeft &&
                player.offsetTop < enemy.offsetTop + enemy.offsetHeight &&
                player.offsetTop + player.offsetHeight > enemy.offsetTop) {
                
                    
                enemy.remove();
                lives -= 1;
                document.getElementById("lives").innerText = lives;
                
            } else if (lives === 0){
                endGame();
            }
        }

  });
}
  // Setup End game state
  function endGame() {
    gameArea.style.display = 'none';
    gameEnd.style.display = 'block';
    //stats.style.display = 'block';
    document.getElementById('timer').innerText='Time elapsed:'+min+':'+sec
    

  }
  
  // restart game when the button restart is pressed
  restartButton.addEventListener('click', () => {
    gameEnd.style.display = 'none';
    gameArea.style.display = 'block';
    var sec = 0;
    var min = 0;
    intervalTimer = setInterval(timeGame, 1000)
    
    document.querySelectorAll(".enemy").forEach(enemy => enemy.remove());
    //document.getElementById("score").innerText = "Score: " + score;
    //document.getElementById("lives").innerText = "Lives: " + lives;
    //spawnEnemy();

  
    // here will be the game restarted
  });
  
  //Start the inicial function introPage() and startGame();
  introPage();
  startGame();