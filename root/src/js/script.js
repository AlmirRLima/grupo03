/* ------- Validação ------- */

var btnLogin = document.getElementById('btnLogin')
var btnLoginAdm = document.getElementById('btnLoginAdm')
var btnExit = document.querySelector('.btnExit')
var regexLogin = /[A-Z.A-Z]@[A-Z.A-Z]/gi
var regexPswd = /[A-Za-z0-9]{8,14}/g
var loged = localStorage.getItem('loged')
var logedin = localStorage.getItem('loginStatus')

function showHide(obj, action) {
    document.querySelector(obj).classList[action]('hide')
}

function loginCheck(){
    if(logedin == 1){
        showHide('.campologin', 'add')
        showHide('.logedin', 'remove')
        console.log('ok')
        document.getElementById('user').innerText = `Olá (${loged})`
    }
}

window.onload = loginCheck()

console.log(logedin)

function validateAdm() {
    let loginAdm = document.getElementById('loginAdm').value
    let pswdAdm = document.getElementById('passwordAdm').value
    
    if (loginAdm != "" && pswdAdm != ""){
        if (loginAdm.match(regexLogin) && pswdAdm.match(regexPswd)) {
            alert('Logado com sucesso!')
            window.location.replace('/root/admin/home_admincss.html')
        } else {
            alert('Usuario ou senha incorretos')
        }
    }else{
        alert('È preciso preencher a campo de login e senha')
    }
}

btnLogin.onclick = function validate() {
    let login = document.getElementById('login').value
    let pswd = document.getElementById('password').value
    
    if (login != "" && pswd != ""){
        if (login.match(regexLogin) && pswd.match(regexPswd)) {
            let logedOn = 1
            localStorage.setItem('loged', login)
            localStorage.setItem('loginStatus', logedOn)
            logedin = localStorage.getItem('logedin') 
            alert('Logado com sucesso!')
            showHide('.logedin', 'remove')
            showHide('.campologin', 'add')
            document.getElementById('user').innerText = `Olá (${loged})`
        } else {
            alert('Usuario ou senha incorretos')
        }
    }else{
        alert('È preciso preencher os campos de login e senha')
    }
    console.log(logedin)
}

btnExit.onclick = function() {
    let logedOut = 0
    showHide('.campologin', 'remove')
    showHide('.logedin', 'add')
    localStorage.setItem('loginStatus', logedOut)
    logedin = localStorage.getItem('logedOut')
    if(logedin != 1){
        console.log(logedin)
    } 
}

/* ------- PreLoader ------- */
$(window).on('load', function () {
    $('#preloader .inner').fadeOut();
    $('#preloader').delay(150).fadeOut('slow');
    $('body').delay(150).css({ 'overflow': 'visible' });
})

/* ------- Banner & Popup------- */
// let images = ["1.png 2.png 3.png 4.png 5.png"];
// let imagesLength = images.length;
// let randomNumber = Math.random();
// randomNumber = randomNumber * imagesLength;
// randomNumber = Math.floor(randomNumber);
// let choosenImage = images[randomNumber];
// banners.src = choosenImage;

/* ------- Banner & Popup v2------- */
var popup = document.querySelector('.popup');
var close = document.querySelector('.close');
// Mostrar automaticamente a popup após 2 segundos da página carregada
window.onload = function () {
    setTimeout(function () {
        popup.style.display = "block";
        const images = "1.png 2.png 3.png 4.png 5.png".split(" ");
        document.querySelector("#banners").src = `./images/banner/${images[Math.floor(Math.random() * images.length)]}`
    }, 2000);
}
close.addEventListener('click', () => {
    popup.style.display = "none";
})
