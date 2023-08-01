var check = true;
var check1 = true;
var check2 = true;
var check3 = true;
var check4 = true;

function changeVisibility(field,icon) {
    var field = document.getElementById(field);
    let type = field.type;

    if (type == 'text') {
        document.getElementById(icon).classList.remove('fa-eye');
        document.getElementById(icon).classList.add('fa-eye-slash');
        field.type = 'password';
    }
    else if (type === 'password') {
        document.getElementById(icon).classList.remove('fa-eye-slash');
        document.getElementById(icon).classList.add('fa-eye');
        field.type = 'text';
    }
}

document.getElementById('passeye').onclick = function () {
    changeVisibility('pass', 'passeye');
}

document.getElementById('repuirepasswordeye').onclick = function () {
    changeVisibility('repuirepassword', 'repuirepasswordeye');
}

function checkByPattern(currpassword, pattern, reqnum) {
    if (currpassword.match(pattern)) {
        document.getElementById(reqnum).classList.remove('gg-close-o');
        document.getElementById(reqnum).classList.add('gg-check-o');
        check = true;
    }
    else {
        document.getElementById(reqnum).classList.remove('gg-check-o');
        document.getElementById(reqnum).classList.add('gg-close-o');
        check = false;
    }
}



function passwordLen(){
    var currpassword= document.getElementById('pass').value;
    if (currpassword.length >= 8) {
        document.getElementById('requirefirst').classList.remove('gg-close-o');
        document.getElementById('requirefirst').classList.add('gg-check-o');
        check = true;
    }
    else {
        document.getElementById('requirefirst').classList.remove('gg-check-o');
        document.getElementById('requirefirst').classList.add('gg-close-o');
        check = false;
    }
}

function checkPassword() {
    var currpassword= document.getElementById('pass').value;
    var capitalletter = /[A-Z]/g;
    var digit = /[0-9]/g;
    var specialchar = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/g;
    checkByPattern(currpassword, specialchar , 'requiresecond');
    if (check == false){
        check1 = false;
    }
    else{
        check1 = true;
    }
    checkByPattern(currpassword, capitalletter , 'requirethird');
    if (check == false){
        check2 = false;
    }
    else{
        check2 = true;
    }
    checkByPattern(currpassword, digit, 'requireforth');
    if (check == false){
        check3 = false;
    }
    else{
        check3 = true;
    }
    passwordLen();
    if (check == false){
        check4 = false;
    }
    else{
        check4 = true;
    }
}

function comparePasswords() {
    var password = document.getElementById('pass').value;
    var reppassword = document.getElementById('repuirepassword').value;

    if (password === reppassword) {
        return true;
    }
    return false;
}

document.getElementById('pass').onkeyup = checkPassword;

var comparepassword = false;
window.addEventListener("keyup", function (e) {
    e.preventDefault();
    comparepassword = comparePasswords();
    if (e.key === 'Enter') {
        if (!comparepassword) {
            document.getElementById('warning').style.color = "red";
            document.getElementById('warning').textContent = "Password's are not the same!"
        }
        else {
            document.getElementById('warning').style.color = "green";
            document.getElementById('warning').textContent = "Your password has changed succesfully!";
        }

        if (check1 === false || check2 === false || check3 === false || check4 === false){
            document.getElementById('warning').style.color = "red";
            document.getElementById('warning').textContent = "Incorrect Password"
            
    }
    }
})