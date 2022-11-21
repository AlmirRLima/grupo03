console.log("Testando JS - form_reserva.js");

const user = "fernandorc@gmail.com";
const senha = "senhaa01";

const btnConfirma2 = document.querySelector("#btnConfirma2");
// const btnServicos = document.querySelector("#btnServicos");

const dadosQuartos = [
  { tipo: "Master", diaria: 600, ocupacao: 6 },
  { tipo: "Family", diaria: 400, ocupacao: 4 },
  { tipo: "Comfort", diaria: 200, ocupacao: 1 },
];

// variaveis form 1
let dtEntrada, dtSaida, qtPessoas, tipoApto, validadorDados;
let servicosEscolhidos = [];

// atualiza datas da reserva para data atual caso não estejam na localStorage...

const [date, time] = formatDate(new Date()).split(" ");
console.log(date);

if (localStorage.getItem("dtEntrada)") === "") {
  const [date, time] = formatDate(new Date()).split(" ");
  console.log(date);
  // document.getElementById("dtEntrada").value = "2022-11-19";
} else {
  // document.getElementById("dtEntrada").value =
  // localStorage.getItem("dtEntrada");
}
// primeira atualização da localStorage...
atualizaLocalStorage();

function atualizaLocalStorage() {
  // verifica dados input
  dtEntrada = document.querySelector("#dtEntrada").value;
  dtSaida = document.querySelector("#dtSaida").value;
  qtPessoas = document.querySelector("#qtPessoas");
  tipoApto = document.querySelector('input[name = "tipoApto"]:checked').value;

  // inicializa localStorage - datas
  dateStartAux = dtEntrada.split("-");
  dateStart = new Date(dateStartAux[0], dateStartAux[1] - 1, dateStartAux[2]);
  localStorage.setItem("dtEntrada", dateStart);
  dateEndAux = dtSaida.split("-");
  dateEnd = new Date(dateEndAux[0], dateEndAux[1] - 1, dateEndAux[2]);
  localStorage.setItem("dtSaida", dateEnd);
  difDates = Math.ceil(dateEnd - dateStart) / (1000 * 60 * 60 * 24);
  localStorage.setItem("difDates", difDates);

  // inicializa localStorage - outros dados
  localStorage.setItem("qtPessoas", qtPessoas.value);
  localStorage.setItem("tipoApto", tipoApto);

  console.log(
    "atualizaLocalStorage",
    dtEntrada,
    dtSaida,
    qtPessoas,
    tipoApto,
    difDates
  );

  // atualiza dados na tela
  document.getElementById("dtCheckin").innerHTML = `<b> ${formatDate(
    localStorage.getItem("dtEntrada")
  )} </b>`;
  document.getElementById("dtCheckout").innerHTML = `<b> ${formatDate(
    localStorage.getItem("dtSaida")
  )} </b>`;
  document.getElementById("qtHospedes").innerHTML = `<b> ${localStorage.getItem(
    "qtPessoas"
  )} </b>`;
  document.getElementById(
    "tipoAcomodacao"
  ).innerHTML = `<b> ${localStorage.getItem("tipoApto")} </b>`;
}

function confirmaReserva() {
  validadorDados = checkInfo();
  console.log("Valida dados", validadorDados);
  dadosOk = validadorDados[0];
  msgRetorno = validadorDados[1];

  console.log(msgRetorno);

  // exibe mensagem de erro se necessário
  document.getElementById("msgAlerta").innerHTML = "";
  if (dadosOk == false) {
    document.getElementById("msgAlerta").innerHTML = `${msgRetorno}`;
    return false;
  }

  // preenche servicos na tela inicial
  // atualiza novamente a localStorage, a tela e prepara calculo
  atualizaLocalStorage();

  qtdDiarias = localStorage.getItem("difDates"); // recupera diferença dos dias da localStorage
  vlrDiaria = 0;

  //obter vlrDiaria do array de aptos
  dadosQuartos.some(function (entry) {
    if (entry.tipo == localStorage.getItem("tipoApto")) {
      vlrDiaria = entry.diaria;
    }
  });
  localStorage.setItem("valorDiaria", vlrDiaria);

  valorTotalDiarias =
    qtdDiarias * vlrDiaria * localStorage.getItem("qtPessoas");
  localStorage.setItem("valorTotalDiarias", valorTotalDiarias);

  // calcula valor dos servicos, não dá pra persitir na localStorage pois não suporta arrays!
  let vlrTotalServico = 0;
  let linhaServico = "";
  let i = 0;
  servicosEscolhidos = [];
  let vlrSomaServicos = 0;

  if (localStorage.getItem("servico1") == "true") {
    vlrTotalServico = 100 * qtdDiarias;
    vlrSomaServicos = vlrSomaServicos + vlrTotalServico;
    (linhaServico = `Servico: Café manhã quarto. Valor dia : R$ 100,00 Total Período : R$ ${vlrTotalServico}`),
      servicosEscolhidos.push(linhaServico);
  }
  if (localStorage.getItem("servico2") == "true") {
    vlrTotalServico = 50 * qtdDiarias;
    vlrSomaServicos = vlrSomaServicos + vlrTotalServico;
    linhaServico = `Servico: Internet 5G. Valor dia : R$ 50,00 Total Período : R$ ${vlrTotalServico}`;
    servicosEscolhidos.push(linhaServico);
  }
  if (localStorage.getItem("servico3") == "true") {
    vlrTotalServico = 150 * qtdDiarias;
    vlrSomaServicos = vlrSomaServicos + vlrTotalServico;
    linhaServico = `Servico : Massagem terapéutica. Valor dia : R$ 150,00 Total Período : R$ ${vlrTotalServico}`;
    servicosEscolhidos.push(linhaServico);
  }
  if (localStorage.getItem("servico4") == "true") {
    vlrTotalServico = 200 * qtdDiarias;
    vlrSomaServicos = vlrSomaServicos + vlrTotalServico;
    linhaServico = `Servico : ChildrenCare. Valor dia : R$ 200,00 Total Período : R$ ${vlrTotalServico}`;
    servicosEscolhidos.push(linhaServico);
  }
  if (localStorage.getItem("servico5") == "true") {
    vlrTotalServico = 100 * qtdDiarias;
    vlrSomaServicos = vlrSomaServicos + vlrTotalServico;
    linhaServico = `Servico : PetCare. Valor dia : R$ 100,00 Total Período : ${vlrTotalServico}`;
    servicosEscolhidos.push(linhaServico);
  }

  console.log("servicosEscolhidos", servicosEscolhidos);
  servicosEscolhidos.forEach((element) => {
    console.log(element);
  });

  localStorage.setItem("valorTotalServicos", vlrSomaServicos);

  valorTotalGeral = vlrSomaServicos + valorTotalDiarias;

  localStorage.setItem("valorTotalGeral", valorTotalGeral);

  return true;
}

function preencheModalResumo() {
  const para = document.createElement("p");
  const br = document.createElement("br");

  const divServicos = document.getElementById("servicos");
  const divDiarias = document.getElementById("diarias");
  const divTotal = document.getElementById("total");

  // limpa div para eliminar seleções anteriores...
  while (divServicos.hasChildNodes()) {
    divServicos.removeChild(divServicos.firstChild);
  }

  // limpa div para eliminar seleções anteriores...
  while (divDiarias.hasChildNodes()) {
    divDiarias.removeChild(divDiarias.firstChild);
  }

  // limpa div para eliminar seleções anteriores...
  while (divTotal.hasChildNodes()) {
    divTotal.removeChild(divTotal.firstChild);
  }

  // processo
  // cria elemento P

  // atualiza div Diarias - apto selecionado, quantidade diarias, valor das diarias, nr de pessoas, valor total
  paraTexto =
    "Apto selecionado: " + localStorage.getItem("tipoApto") + "<br />";
  document.getElementById("diarias").appendChild(createPara(paraTexto));

  paraTexto =
    "Quantidade hospedes: " + localStorage.getItem("qtPessoas") + "<br />";
  document.getElementById("diarias").appendChild(createPara(paraTexto));

  paraTexto =
    "Quantidade diarias: " + localStorage.getItem("difDates") + "<br />";
  document.getElementById("diarias").appendChild(createPara(paraTexto));

  paraTexto = "Valor diaria: " + localStorage.getItem("valorDiaria") + "<br />";
  document.getElementById("diarias").appendChild(createPara(paraTexto));

  paraTexto =
    "Valor total diarias: " +
    localStorage.getItem("valorTotalDiarias") +
    "<br />";
  document.getElementById("diarias").appendChild(createPara(paraTexto));

  // atualiza div servicos
  servicosEscolhidos.forEach((element) => {
    paraTexto = element + "<br />";
    document.getElementById("servicos").appendChild(createPara(paraTexto));
  });

  // atualiza div total
  paraTexto =
    "Total diarias: " + localStorage.getItem("valorTotalDiarias") + "<br />";
  document.getElementById("total").appendChild(createPara(paraTexto));

  paraTexto =
    "Total servicos: " + localStorage.getItem("valorTotalServicos") + "<br />";
  document.getElementById("total").appendChild(createPara(paraTexto));

  paraTexto =
    "Total geral: " + localStorage.getItem("valorTotalGeral") + "<br />";
  document.getElementById("total").appendChild(createPara(paraTexto));
}

function createPara(conteudo) {
  var para = document.createElement("p");
  para.innerHTML = conteudo;
  return para;
}

function formatDate(inputDate) {
  let date, month, year;

  // sem converter de novo, dá erro...
  date = new Date(inputDate).getDate();
  month = new Date(inputDate).getMonth() + 1;
  year = new Date(inputDate).getFullYear();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${date}/${month}/${year}`;
}

function checkInfo() {
  // recupera dados localStorage
  msgReturn = [true, "Dados OK!"];
  dtEntrada = localStorage.getItem("dtEntrada");
  dtSaida = localStorage.getItem("dtSaida");
  qtPessoas = localStorage.getItem("qtPessoas");
  tipoApto = localStorage.getItem("tipoapto");

  console.log("CheckInfo", dtEntrada, dtSaida, qtPessoas, tipoApto);

  if (dtEntrada == "" || dtSaida == "" || dtSaida <= dtEntrada) {
    msgReturn = [false, "Datas de entrada e/ou saída inválidas"];
  }

  if (qtPessoas == 0) {
    msgReturn = [false, "Quantidade de pessoas inválido"];
  }

  if (tipoApto == "") {
    msgReturn = [false, "Tipo de apartamento não selecionado"];
  }

  return msgReturn;
}

function checkUser(userLogin, senhaLogin) {
  let validaUser = false;
  //console.log(`checkUser Funcion - userLogin: ${userLogin} - user: ${user}`);
  if (userLogin == user) {
    validaUser = true;
  }
  //console.log(`Valida user = ${validaUser}`);
  return validaUser;
}

/* js do exercicio anterior... 

let titulo01 = document.getElementById("titulo01");
let titulo01_a = document.getElementsByClassName("titulo");
let titulo01_b = document.querySelector("h2");
let titulo01_c = document.querySelectorAll("h2");

console.log(`Informação da página html: ${titulo01}`);
console.log(`Informação da página html: ${titulo01_a[0].innerHTML}`);
console.log(`Informação da página html: ${titulo01_a[1].innerHTML}`);
console.log("---------------------------------------------------");
console.log(`Informação da página html: ${titulo01_c[0].innerHTML}`);
console.log(`Informação da página html: ${titulo01_c[1].innerHTML}`);

console.log(titulo01);
console.log(titulo01_a);
console.log(titulo01_b);
console.log(titulo01.innerHTML);
console.log(titulo01_a.innerHTML);
console.log(titulo01_b.innerHTML);

/* imprimido em tela... */

/* titulo01_c[1].innerHTML =
  "Aula de logica - imprimindo em tela...retorno via JS";
titulo01_c[1].style = "color: brown";

/* js do exercicio anterior... */

/* console.log("Testando JS - exercicio anterior...");
let nivel = 1;
let statusContrato = "";
switch (nivel) {
  case 1:
    statusContrato = "Estagiario";
    break;
  case 2:
    statusContrato = "Efetivar";
    break;
  default:
    statusContrato = "Em contratação";
    break;
}
console.log("Status contratacao = " + statusContrato);

let i = 0;
let y = 2;

while (i < 5) {
  i++;
  if (i === 3) {
    console.log("variavel I igual a 3!!");
  }
  y = y + i;
  console.log(`Variaveis I e Y :  ${i} ${y}`);
}
*/

//dtSaida = document.querySelector("#dtSaida");
//qtPessoas = document.querySelector("#qtPessoas");
//tipoApto = document.querySelector('input[name = "tipoApto"]:checked').value;

// inicializa variaveis data entrada e saida
// document.getElementById("dtEntrada").value = new Date().toDateInputValue();
// document.getElementById("dtSaida").value = new Date().toDateInputValue();

//console.log(btnConfirma);
//console.log(btnServicos);

// btnServicos.addEventListener("click", () => {
//   console.log("Cliquei em outros servicos");
// });

// btnConfirma2.onclick = function () {
//   dtEntrada = document.querySelector("#dtEntrada");
//   dtSaida = document.querySelector("#dtSaida");
//   qtPessoas = document.querySelector("#qtPessoas");
//   tipoApto = document.querySelector('input[name = "tipoApto"]:checked').value;
//   console.log("tipoApto=", tipoApto);

//   localStorage.setItem("dtEntrada", dtEntrada.value);
//   localStorage.setItem("dtSaida", dtSaida.value);
//   localStorage.setItem("qtPessoas", qtPessoas.value);
//   localStorage.setItem("tipoApto", tipoApto);
//   localStorage.setItem("mytime", Date.now());

//   validadorDados = checkInfo();
//   dadosOk = validadorDados[0];
//   msgRetorno = validadorDados[1];

//   // apoio - remover
//   console.log("Dados localstorage");
//   console.log(localStorage.getItem("dtEntrada"));
//   console.log(localStorage.getItem("dtSaida"));
//   console.log(localStorage.getItem("qtPessoas"));
//   console.log(localStorage.getItem("tipoApto"));

//   // console.log(checkInfo());
//   // console.log(dadosOk == false);
//   console.log(msgRetorno);

//   // exibe mensagem de erro se necessário
//   document.getElementById("msgAlerta").innerHTML = "";
//   if (dadosOk == false) {
//     document.getElementById("msgAlerta").innerHTML = `${msgRetorno}`;
//     return;
//   }

//   // preenche dados da reserva na tela inicial
//   document.getElementById(
//     "tipoAcomodacao"
//   ).innerHTML = `<b> ${localStorage.getItem("tipoApto")} </b>`;
//   document.getElementById("dtCheckin").innerHTML = `<b> ${localStorage.getItem(
//     "dtEntrada"
//   )} </b>`;
//   document.getElementById("dtCheckout").innerHTML = `<b> ${localStorage.getItem(
//     "dtSaida"//dtSaida = document.querySelector("#dtSaida");
//qtPessoas = document.querySelector("#qtPessoas");
//tipoApto = document.querySelector('input[name = "tipoApto"]:checked').value;

// inicializa variaveis data entrada e saida
// document.getElementById("dtEntrada").value = new Date().toDateInputValue();
// document.getElementById("dtSaida").value = new Date().toDateInputValue();

//console.log(btnConfirma);
//console.log(btnServicos);

// btnServicos.addEventListener("click", () => {
//   console.log("Cliquei em outros servicos");
// });

// btnConfirma2.onclick = function () {
//   dtEntrada = document.querySelector("#dtEntrada");
//   dtSaida = document.querySelector("#dtSaida");
//   qtPessoas = document.querySelector("#qtPessoas");
//   tipoApto = document.querySelector('input[name = "tipoApto"]:checked').value;
//   console.log("tipoApto=", tipoApto);

//   localStorage.setItem("dtEntrada", dtEntrada.value);
//   localStorage.setItem("dtSaida", dtSaida.value);
//   localStorage.setItem("qtPessoas", qtPessoas.value);
//   localStorage.setItem("tipoApto", tipoApto);
//   localStorage.setItem("mytime", Date.now());

//   validadorDados = checkInfo();
//   dadosOk = validadorDados[0];
//   msgRetorno = validadorDados[1];

//   // apoio - remover
//   console.log("Dados localstorage");
//   console.log(localStorage.getItem("dtEntrada"));
//   console.log(localStorage.getItem("dtSaida"));
//   console.log(localStorage.getItem("qtPessoas"));
//   console.log(localStorage.getItem("tipoApto"));

//   // console.log(checkInfo());
//   // console.log(dadosOk == false);
//   console.log(msgRetorno);

//   // exibe mensagem de erro se necessário
//   document.getElementById("msgAlerta").innerHTML = "";
//   if (dadosOk == false) {
//     document.getElementById("msgAlerta").innerHTML = `${msgRetorno}`;
//     return;
//   }

//   // preenche dados da reserva na tela inicial
//   document.getElementById(
//     "tipoAcomodacao"
//   ).innerHTML = `<b> ${localStorage.getItem("tipoApto")} </b>`;
//   document.getElementById("dtCheckin").innerHTML = `<b> ${localStorage.getItem(
//     "dtEntrada"
//   )} </b>`;
//   document.getElementById("dtCheckout").innerHTML = `<b> ${localStorage.getItem(
//     "dtSaida"
//   )} </b>`;
//   document.getElementById("qtHospedes").innerHTML = `<b> ${localStorage.getItem(
//     "qtPessoas"
//   )} </b>`;
// };
//   )} </b>`;
//   document.getElementById("qtHospedes").innerHTML = `<b> ${localStorage.getItem(
//     "qtPessoas"
//   )} </b>`;
// };
