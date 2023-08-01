let board = document.getElementById('board');
let points = document.getElementById('points');
let zombieContainer = document.getElementById('zombieContainer');
let msg = document.getElementById('lifes');
let circle = document.getElementById('outeraim');
let gameoverWindow = document.getElementById('gameover');
let endScore = document.getElementById('score');
let restart = document.getElementById('restart');
let score = 0;
let missed = 3;
let gameover = false;

board.addEventListener('click', missedShot, false);
board.addEventListener('mousemove', aim, false);


function aim(e) {
    circle.style.left = e.pageX-45 + "px";
    circle.style.top = e.pageY-45 + "px";
}

function zombieClick(e) {
    e.stopPropagation();
    if (gameover) return;
    score += 12;
    zombieContainer.removeChild(e.currentTarget);
}

function missedShot() {
    if (gameover) return;
    score -= 6;
}

function newZombie() {
    let newZombie = document.createElement('div');
    newZombie.className = "zombie";
    newZombie.innerHTML = "<img src='images/walkingdead.png' alt='zombie' class='zombies'>";
    newZombie.style.bottom = (10 + Math.random() * 130) + "px";
    newZombie.style.scale = 0.8 + Math.random()/2;
    switch (Math.floor(Math.random() * 5) + 1) {
        case 1: newZombie.style.animationDuration = 5 + "s"; 
        break;
        case 2: newZombie.style.animationDuration = 4 + "s"; 
        break;
        case 3: newZombie.style.animationDuration = 3 + "s"; 
        break;
        case 4: newZombie.style.animationDuration = 2 + "s"; 
        break;
        case 5: newZombie.style.animationDuration = 1.7 + "s"; 
        break;
    }
    

    newZombie.addEventListener('mousedown', zombieClick, false);
    newZombie.addEventListener('animationend', zombieMissed, false);
    zombieContainer.append(newZombie);
}

function zombieMissed(e) {
    missed -= 1;
    zombieContainer.removeChild(e.currentTarget);
    if (missed < 1) gameOver();
}


function gameOver() {
    gameover = true;
    gameoverWindow.style.display = "block";
    endScore.innerText = score;
}

restart.addEventListener('click', restartGame, false);

function render() {
    points.innerText ="Points: "+ score;
    msg.innerText = '❤️' +missed;
    if(Math.random() < 0.01) newZombie();
    if (!gameover) requestAnimationFrame(render);
}


function restartGame() {
    missed = 3;
    points.innerText = 0;
    gameoverWindow.style.display = "none";
    zombieContainer.innerHTML = "";
    score = 6;
    gameover = false;
    render();
}

render();