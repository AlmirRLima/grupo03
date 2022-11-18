/* ------- Local Storage Cadastro Usuário------- */

const salvarCadastro = document.querySelector("#salvarCadastro")
let nomeCli = document.querySelector("#nomeCli")
let telefoneCli = document.querySelector("#telefoneCli");
let emailCli = document.querySelector("#emailCli");
let datnascCli = document.querySelector("#datnascCli");
let nacionalidadeCli = document.querySelector("#nacionalidadeCli");
let genCli = document.querySelector("#genCli");
let endCli = document.querySelector("#endCli");
let npe = document.querySelector("#npe");


document.getElementById("fieldCli").hidden = true;



  function verificaForm() {
       document.getElementById("fieldCli").hidden = false
       document.querySelector("#nomeCliente").innerText = 
         localStorage.getItem('nomeuser')
       document.querySelector("#telCliente").innerText =
         localStorage.getItem("teluser");
       document.querySelector("#emailCliente").innerText =
         localStorage.getItem("emailuser");
       document.querySelector("#datCliente").innerText =
         localStorage.getItem("dateuser");
       document.querySelector("#nacCliente").innerText =
         localStorage.getItem("nacuser");
       document.querySelector("#genCliente").innerText =
         localStorage.getItem("genuser");
       document.querySelector("#endCliente").innerText =
         localStorage.getItem("enduser");
       localStorage.npeuser
         ? (document.querySelector("#notCliente").innerText = "Ativo")
         : (document.querySelector("#notCliente").innerText = "Desativado");
}

localStorage.nomeuser
  ? verificaForm()
  : null

salvarCadastro.onclick = function () {
  console.log("butão apertado")
  localStorage.setItem("nomeuser", nomeCli.value);
  localStorage.setItem("teluser", telefoneCli.value);
  localStorage.setItem("emailuser", emailCli.value);
  localStorage.setItem("dateuser", datnascCli.value);
  localStorage.setItem("nacuser", nacionalidadeCli.value);
  localStorage.setItem("genuser", genCli.value);
  localStorage.setItem("enduser", endCli.value);
  localStorage.setItem("npeuser", npe.value);
};