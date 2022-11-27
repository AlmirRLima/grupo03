/* ------- Validação ------- */
btnLogin.addEventListener('click',()=>{
    import('./module/user_module.js').then((user) => {
        user.validate()        
    }).catch((err) => {
    });
})

window.onload = import('./module/user_module.js').then((user)=>{
    user.loginCheck()
})

btnExit.addEventListener('click',()=>{
    import('./module/user_module.js').then((user) => {
        user.logOut()
    }).catch((err) => {        
    });
})


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

