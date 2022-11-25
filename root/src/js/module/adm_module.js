export function validateAdm() {
    let loginAdm = document.getElementById('loginAdm').value
    let pswdAdm = document.getElementById('passwordAdm').value
    
    if (loginAdm != "" && pswdAdm != ""){
        if (loginAdm.match(regexLoginAdm) && pswdAdm.match(regexPswd)) {
            alert('Logado com sucesso!')
            window.location.replace('/root/admin/home_admincss.html')
        } else {
            alert('Usuario ou senha incorretos')
        }
    }else{
        alert('È preciso preencher a campo de login e senha')
    }
}