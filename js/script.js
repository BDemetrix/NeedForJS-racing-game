const   score = document.querySelector('.score'),
        start = document.querySelector('.game__start'),
        gameArea = document.querySelector('.game__area'),
        car = document.createElement('div');
car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
const d = 100;

const keys = {
    ArrowUp:    false,
    ArrowDown:  false,
    ArrowRight: false,
    ArrowLeft:  false 
};

const setting = {
    start:  false,
    score:  0,
    speed:  3,
    traffic: 2.5
};

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
    
}

function startGame(event) {
    start.classList.add('hide');
    for (let i = 0; i < getQuantityElements(d); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * d) + 'px';
        line.y = i * d;
        gameArea.appendChild(line);
    }
    for (let i = 0; i < getQuantityElements(d * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.getRandomX = getRandomX;
        enemy.setBackground = setBackground;
        enemy.y = -d * setting.traffic * (i + 1);
        enemy.style.top = enemy.y + 'px';
        gameArea.appendChild(enemy);
        enemy.style.left = enemy.getRandomX(gameArea) + 'px';
        //enemy.style.background = 'transparent url("../img/enemy1.png") center / cover no-repeat';
        enemy.setBackground();
    }

    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {
    if (setting.start) {
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x >= setting.speed) {
            setting.x -=setting.speed;
        }
        if (keys.ArrowRight && setting.x <= gameArea.offsetWidth - car.offsetWidth - setting.speed) {
            setting.x += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 10) {
            setting.y -= setting.speed;
        }
        if (keys.ArrowDown && setting.y <= gameArea['clientHeight'] - 0.5 * car['clientHeight']) {
            setting.y += setting.speed;
        }

        car.style.left = setting.x +'px';
        car.style.top = setting.y + 'px';

        requestAnimationFrame(playGame);
    }
}

function startRun(event) {
    event.preventDefault(); 
    keys[event.key] = true;
}

function stopRun(event) {

    keys[event.key] = false;

    if (event.key === 'Escape') {
        setting.start = false;
        start.classList.remove('hide');
    }

}

function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function (line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';
        if (line.y >= document.documentElement.clientHeight) {
            line.y = -d;
        }
    });
}

function moveEnemy() {
    let enemys = document.querySelectorAll('.enemy');
    enemys.forEach(function (enemy) {
        enemy.y += setting.speed/2;
        enemy.style.top = enemy.y + 'px';
        if (enemy.y >= document.documentElement.clientHeight) {
            enemy.y = -d * setting.traffic;
            enemy.style.left = enemy.getRandomX(gameArea) + 'px';
            enemy.setBackground();
        }
    });
}    
   
function getRandomX(gameArea) {
    return Math.floor(Math.random() * (gameArea.offsetWidth - this.offsetWidth));
}

function setBackground() {
    let bgImage = 'transparent url("../img/enemy';
        bgImage +=  Math.floor(Math.random()*4);
        bgImage += '.png") center / cover no-repeat';

    this.style.background = bgImage;
}