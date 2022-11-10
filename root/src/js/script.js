const btnLogin = document.getElementById('btnLogin')
const btnExit = document.querySelector('.btnExit')
var regexLogin = /[A-Z.A-Z]@[A-Z.A-Z]/gi
var regexPswd = /[A-Za-z0-9]{8,14}/g

function showHide(obj,action){
    document.querySelector(obj).classList[action]('hide')
}

btnLogin.onclick = function Validate(){
    let login = document.getElementById('login').value
    let pswd = document.getElementById('password').value
    
    if (login.match(regexLogin) && pswd.match(regexPswd)){
        if(login != ""){localStorage.setItem('loged',login)}
        let loged = localStorage.getItem('loged')
        console.log(login)
        console.log(loged)
        alert('Logado com sucesso!')
        showHide('.logedin','remove')
        showHide('.campologin','add')
        document.getElementById('user').innerText=`Olá (${loged})`
    }else{
        alert('Usuario ou senha incorretos')
    }
    
}

btnExit.onclick = function(){
    showHide('.campologin','remove')
    showHide('.logedin','add')
}

