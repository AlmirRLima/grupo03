var btnLogin = document.getElementById('btnLogin')
var regexLogin = /[A-Z.A-Z]@[A-Z.A-Z]/gi
var regexLoginAdm = /[A-Za-z0-9]/gi
var regexPswd = /[A-Za-z0-9]{8,14}/g
var loged = localStorage.getItem('loged')
var logedin = localStorage.getItem('loginStatus')
var btnExit = document.getElementById('btnExit')


export function validate() {
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
        }else if(login.match(regexLoginAdm) && pswd.match(regexPswd)){
            alert('Logado com sucesso!')
            window.location.replace('/root/admin/home_admincss.html')
        }else {
            alert('Usuario ou senha incorretos')
        }
    }else{
        alert('È preciso preencher os campos de login e senha')
    }
}

function showHide(obj, action) {
    document.querySelector(obj).classList[action]('hide')
}

export function logOut() {
    let logedOut = 0
    showHide('.campologin', 'remove')
    showHide('.logedin', 'add')
    localStorage.setItem('loginStatus', logedOut)
    logedin = localStorage.getItem('logedOut')
}

export function loginCheck(){
    if(logedin == 1){
        showHide('.campologin', 'add')
        showHide('.logedin', 'remove')
        console.log('ok')
        document.getElementById('user').innerText = `Olá (${loged})`
    }
}