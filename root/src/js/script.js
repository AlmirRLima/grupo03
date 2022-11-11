/* ------- Validação ------- */

const btnLogin = document.getElementById('btnLogin')
const btnExit = document.querySelector('.btnExit')
var regexLogin = /[A-Z.A-Z]@[A-Z.A-Z]/gi
var regexPswd = /[A-Za-z0-9]{8,14}/g

function showHide(obj, action) {
    document.querySelector(obj).classList[action]('hide')
}

btnLogin.onclick = function Validate() {
    let login = document.getElementById('login').value
    let pswd = document.getElementById('password').value
    if (login.match(regexLogin) && pswd.match(regexPswd)) {
        if (login != "") { localStorage.setItem('loged', login) }
        let loged = localStorage.getItem('loged')
        console.log(login)
        console.log(loged)
        alert('Logado com sucesso!')
        showHide('.logedin', 'remove')
        showHide('.campologin', 'add')
        document.getElementById('user').innerText = `Olá (${loged})`
    } else {
        alert('Usuario ou senha incorretos')
    }
}
btnExit.onclick = function () {
    showHide('.campologin', 'remove')
    showHide('.logedin', 'add')
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
