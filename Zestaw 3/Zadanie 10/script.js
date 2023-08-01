let container = document.getElementById('container');
let area = document.getElementById('area');
let ball = document.getElementById('ball');
let warning = document.getElementById('warning');

container.addEventListener('click', containerClick, false);
area.addEventListener('click', areaClick, false);

function containerClick(e) {
    warning.textContent = "Naciśnięto poza obszarem wyznaczonym!!!";
    warning.style.transform = "translate(" + (e.clientX-150) + "px, " + (e.clientY-300) + "px)";
}

function areaClick(e) {
    e.stopPropagation();
    warning.textContent = "";
    ball.style.transform = "translate(" + (e.clientX-15) + "px, " + (e.clientY-15) + "px)";
}