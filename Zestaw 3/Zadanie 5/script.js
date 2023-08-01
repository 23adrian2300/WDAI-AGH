let points = 0;
let cnt = 0;
let propagation = true;
let changeVal = false;

let blue = document.getElementById('blue');
let red = document.getElementById('red');
let yellow = document.getElementById('yellow');
const section = document.getElementById('section');
const propagationButton = document.getElementById('prop');
const reset = document.getElementById('reset');
const change = document.getElementById('change');

function start() {
    blue.addEventListener('click', blueClick, changeVal);
    red.addEventListener('click', redClick, changeVal);
    yellow.addEventListener('click', yellowClick, changeVal);
}

function check() {
    displayPoints();
    if (points > 30) {
        red.removeEventListener('click', redClick, changeVal);
        red.style.backgroundColor = 'grey';
    }
    if (points > 50) {
        yellow.removeEventListener('click', yellowClick, changeVal);
        yellow.style.backgroundColor = 'grey';
    }
}

function displayPoints() {
    document.querySelector('h1').innerText = "points: " + points;
}

function clear() {
    while (section.children.length > 1) {
        section.removeChild(section.lastChild);
    }
}


function displayCom(str) {
    let paragraph = document.createElement('p');
    let textnode = document.createTextNode(str);
    paragraph.appendChild(textnode);
    section.appendChild(paragraph);
}


propagationButton.addEventListener('click', () => {
    if (propagation) {
        propagationButton.innerText = "StartPropagation";
        propagation = false;
    }
    else {
        propagationButton.innerText = "StopPropagation";
        propagation = true;
    }
});



reset.addEventListener('click', () => {
    points = 0;
    changeVal = false;
    propagation = true;
    red.style.backgroundColor = 'red';
    yellow.style.backgroundColor = 'yellow';
    clear();
    displayPoints();
    start();
});



change.addEventListener('click', () => {

    blue.removeEventListener('click', blueClick, changeVal);
    red.removeEventListener('click', redClick, changeVal);
    yellow.removeEventListener('click', yellowClick, changeVal);
    changeVal = !changeVal
    blue.addEventListener('click', blueClick, changeVal);
    red.addEventListener('click', redClick, changeVal);
    yellow.addEventListener('click', yellowClick, changeVal);
    check();
})

function blueClick() {
    points += 1;
    displayCom("Nacisnąłeś czerwony o wartości 1");
    check();
    cnt+=1
    if (cnt>7){
        cnt = 0;
        clear();
    }
}

function redClick() {
    if (propagation) {
        event.stopPropagation();
    }
    points += 2;
    displayCom("Nacisnąłeś czerwony o wartości 2");
    check();
    cnt+=1
    if (cnt>7){
        cnt = 0;
        clear();
    }
}

function yellowClick() {
    if (propagation) {
        event.stopPropagation();
    }

    points += 5;
    displayCom("Nacisnąłeś czerwony o wartości 5");
    check();
    cnt+=1
    if (cnt>7){
        cnt = 0;
        clear();
    }
}

function disabled() {
    if (propagation) {
        event.stopPropagation();
    }
    var paragraph = document.createElement('p');
    var textnode = document.createTextNode("Przycisk wyłączony!");
    paragraph.appendChild(textnode);
    section.appendChild(paragraph);
}

start();
check();