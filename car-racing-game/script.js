const gameArea = document.querySelector('.gameArea');
const scoreDisplay = document.querySelector('.score');
const playerCar = document.querySelector('.playerCar');

let player = {
  speed: 5,
  score: 0,
  x: 175,
};

let keys = {
  ArrowLeft: false,
  ArrowRight: false,
};

document.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

function startGame() {
  window.requestAnimationFrame(playGame);
  spawnEnemy();
}

function playGame() {
  if (keys.ArrowLeft && player.x > 0) {
    player.x -= player.speed;
  }
  if (keys.ArrowRight && player.x < 350) {
    player.x += player.speed;
  }

  playerCar.style.left = player.x + 'px';

  moveEnemies();
  player.score++;
  scoreDisplay.textContent = 'Score: ' + player.score;

  window.requestAnimationFrame(playGame);
}

function spawnEnemy() {
  const enemy = document.createElement('div');
  enemy.classList.add('enemy');
  enemy.style.left = Math.floor(Math.random() * 350) + 'px';
  enemy.style.top = '-100px';
  gameArea.appendChild(enemy);
}

function moveEnemies() {
  let enemies = document.querySelectorAll('.enemy');
  enemies.forEach((enemy) => {
    let top = parseInt(enemy.style.top);
    top += 5;

    if (top > 600) {
      enemy.remove();
      spawnEnemy();
    } else {
      enemy.style.top = top + 'px';
    }

    // Collision detection
    if (isCollide(playerCar, enemy)) {
      alert('Game Over! Final Score: ' + player.score);
      window.location.reload();
    }
  });
}

function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

startGame();
