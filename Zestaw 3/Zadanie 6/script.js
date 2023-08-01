const contactname = document.getElementById("name");
const phonenumber = document.getElementById("phonenumber");
const form = document.querySelector("form");
const addbutton = document.getElementById("addbutton");
const contactbook = document.getElementById("book");

function deleteNameandPhone(){
    form.name.value = ""
    form.phonenumber.value = ""
}

function checkAdress(){
    if (!contactname.checkValidity() && !phonenumber.checkValidity())
    {   alert("Nie poprawne dane oraz telefon")
        return true;
    }

    if(!contactname.checkValidity()){
        alert("Nie poprawne dane")
        return true;
    }
    if(!phonenumber.checkValidity()){
        alert("Nie poprawny telefon")
        return true;
    }
}

function addAdress(){
    if(checkAdress() === true){
        return;
    };

    let adress = document.createElement("section")
    adress.classList.add("adress")

    let left = document.createElement("div")
    left.classList.add("left")
    
    let left_h2 = document.createElement('h2');
    left_h2.textContent=form.name.value.trim();
    let left_p = document.createElement('p');
    left_p.textContent=form.phonenumber.value.trim();

    left.appendChild(left_h2)
    left.appendChild(left_p)
    adress.appendChild(left)

    let right = document.createElement('div');
    right.classList.add("right");
    right.textContent="Usuń 🗑️"
    right.addEventListener('click', deleteContact)

    adress.appendChild(right)
    contactbook.appendChild(adress)
    deleteNameandPhone;
}

function deleteContact(){
    let index = Array.from(contactbook.children).indexOf(this.parentNode);
    contactbook.removeChild(contactbook.children[index]);
}

addbutton.addEventListener('click', addAdress)