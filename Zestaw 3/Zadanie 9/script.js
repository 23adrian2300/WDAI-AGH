async function getJson() {
        var res = await fetch("db.json");
        var json = await res.json();
        return json; 
}

function loadSlide(id, data) {
    var nameObj = document.getElementById('name');
    var titleObj = document.getElementById('position');
    var contentObj = document.getElementById('content');
    var imgObj = document.getElementById('img');
    
    var name = data[id].name;
    var title = data[id].title;
    var content = data[id].description;
    var img = data[id].img;

    nameObj.textContent = name;
    titleObj.textContent = title;
    contentObj.textContent = content;
    imgObj.srcset = "img/" + img;
}

async function start() {
    var data = await getJson();
    data = data.pracownicy;
    var id = 0;
    var slide = document.querySelector(".card");
    loadSlide(0, data);
    document.getElementById('right').addEventListener('click', function () {
        slide.style = "animation-name:rightOut; animation-duration:1s";
        id++;
        setTimeout(() => {
            loadSlide(id % data.length, data);
            slide.style = "animation-name:leftIn; animation-duration:1s";
        }, 500);  
    })

    document.getElementById('left').addEventListener('click', function (e) {
        slide.style = "animation-name:leftOut; animation-duration:1s"
        id--;
        if (id < 0) {
            id += data.length;
        }
        setTimeout(() => {
            loadSlide(id % data.length, data);
            slide.style = "animation-name:rightIn;animation-duration:1s";
        }, 500);
    })

    document.getElementById('random').addEventListener('click', function() {
        slide.style = "animation-name:rightOut;animation-duration:1s"
        id = Math.round(Math.random() * data.length);
        setTimeout(() => {
            loadSlide(id % data.length, data);
            slide.style = "animation-name:leftIn;animation-duration:1s";
        }, 500);
    })
}

start();