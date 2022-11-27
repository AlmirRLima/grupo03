console.log("Testando JS..1 - form_reserva.js");

export default {
  atualizaDatasReserva,
  atualizaLocalStorage,
  confirmaReserva,
  preencheModalResumo,
  createPara,
  formatDate,
  checkInfo,
  msgAula,
};

export const msgTeste = "carregando modulo Reservas!";

export function msgAula() {
  return "teste Teste com function em module...";
}

export function atualizaDatasReserva() {
  // atualiza datas da reserva para data atual caso não estejam na localStorage...
  // finalizar função!!!!!
  const [date, time] = formatDate(new Date()).split(" ");
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
}

export function atualizaLocalStorage() {
  // variaveis form Reservas
  let dtEntrada,
    dtSaida,
    qtPessoas,
    tipoApto,
    validadorDados,
    dateStart,
    dateEnd,
    dateStartAux,
    difDates,
    dateEndAux;

  let servicosEscolhidos = [];

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
  return "Atualizaçao ok";
}

export function confirmaReserva() {
  let validadorDados,
    dadosOk,
    qtdDiarias,
    vlrDiaria,
    valorTotalDiarias,
    servicosEscolhidos,
    valorTotalGeral,
    msgRetorno;
  // define dados dos quartos...
  const dadosQuartos = [
    { tipo: "Master", diaria: 600, ocupacao: 6 },
    { tipo: "Family", diaria: 400, ocupacao: 4 },
    { tipo: "Comfort", diaria: 200, ocupacao: 1 },
  ];

  validadorDados = checkInfo();
  dadosOk = validadorDados[0];
  msgRetorno = validadorDados[1];

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
  localStorage.setItem("valorTotalDiarias", currencyFormat(valorTotalDiarias));

  // calcula valor dos servicos, não dá pra persitir na localStorage pois não suporta arrays!
  let vlrTotalServico = 0;
  let linhaServico = "";
  let i = 0;
  servicosEscolhidos = "";
  let vlrSomaServicos = 0;

  if (localStorage.getItem("servico1") == "true") {
    vlrTotalServico = 100 * qtdDiarias;
    vlrSomaServicos = vlrSomaServicos + vlrTotalServico;
    linhaServico = `Servico: Café manhã quarto. Valor dia : R$ 100,00 Total Período : ${currencyFormat(
      vlrTotalServico
    )}|`;
    console.log("Valor Servicço currency", currencyFormat(vlrTotalServico));
    servicosEscolhidos = servicosEscolhidos + linhaServico;
  }
  if (localStorage.getItem("servico2") == "true") {
    vlrTotalServico = 50 * qtdDiarias;
    vlrSomaServicos = vlrSomaServicos + vlrTotalServico;
    linhaServico = `Servico: Internet 5G. Valor dia : R$ 50,00 Total Período : ${currencyFormat(
      vlrTotalServico
    )}|`;
    servicosEscolhidos = servicosEscolhidos + linhaServico;
  }
  if (localStorage.getItem("servico3") == "true") {
    vlrTotalServico = 150 * qtdDiarias;
    vlrSomaServicos = vlrSomaServicos + vlrTotalServico;
    linhaServico = `Servico : Massagem terapéutica. Valor dia : R$ 150,00 Total Período : ${currencyFormat(
      vlrTotalServico
    )}|`;
    servicosEscolhidos = servicosEscolhidos + linhaServico;
  }
  if (localStorage.getItem("servico4") == "true") {
    vlrTotalServico = 200 * qtdDiarias;
    vlrSomaServicos = vlrSomaServicos + vlrTotalServico;
    linhaServico = `Servico : ChildrenCare. Valor dia : R$ 200,00 Total Período : ${currencyFormat(
      vlrTotalServico
    )}|`;
    servicosEscolhidos = servicosEscolhidos + linhaServico;
  }
  if (localStorage.getItem("servico5") == "true") {
    vlrTotalServico = 100 * qtdDiarias;
    vlrSomaServicos = vlrSomaServicos + vlrTotalServico;
    linhaServico = `Servico : PetCare. Valor dia : R$ 100,00 Total Período : ${currencyFormat(
      vlrTotalServico
    )}|`;
    servicosEscolhidos = servicosEscolhidos + linhaServico;
  }

  // console.log("servicosEscolhidos", servicosEscolhidos);
  // servicosEscolhidos.forEach((element) => {
  //   console.log(element);
  // });

  localStorage.setItem("servicosEscolhidos", servicosEscolhidos);
  localStorage.setItem("valorTotalServicos", currencyFormat(vlrSomaServicos));

  valorTotalGeral = vlrSomaServicos + valorTotalDiarias;

  localStorage.setItem("valorTotalGeral", currencyFormat(valorTotalGeral));

  return true;
}

export function preencheModalResumo() {
  const para = document.createElement("p");
  const br = document.createElement("br");

  const divServicos = document.getElementById("servicos");
  const divDiarias = document.getElementById("diarias");
  const divTotal = document.getElementById("total");

  let servicosEscolhidos = "";
  localStorage.getItem("servicosEscolhidos") !== ""
    ? (servicosEscolhidos = localStorage
        .getItem("servicosEscolhidos")
        .split("|"))
    : "";

  // console.log("servicosEscolhidos", servicosEscolhidos);

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
  let paraTexto = "";
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

  paraTexto =
    "Valor diaria: " +
    currencyFormat(localStorage.getItem("valorDiaria")) +
    "<br />";
  document.getElementById("diarias").appendChild(createPara(paraTexto));

  paraTexto =
    "Valor total diarias: " +
    localStorage.getItem("valorTotalDiarias") +
    "<br />";
  document.getElementById("diarias").appendChild(createPara(paraTexto));

  // atualiza div servicos se houver...
  if (servicosEscolhidos !== "") {
    servicosEscolhidos.forEach((element) => {
      paraTexto = element + "<br />";
      document.getElementById("servicos").appendChild(createPara(paraTexto));
    });
  }

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

export function createPara(conteudo) {
  var para = document.createElement("p");
  para.innerHTML = conteudo;
  return para;
}

export function formatDate(inputDate) {
  let date, month, year;

  // sem converter de novo, dá erro...
  date = new Date(inputDate).getDate();
  month = new Date(inputDate).getMonth() + 1;
  year = new Date(inputDate).getFullYear();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${date}/${month}/${year}`;
}

export function checkInfo() {
  // recupera dados localStorage
  let msgReturn, dtEntrada, dtSaida, qtPessoas, tipoApto;
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

export function currencyFormat(strVlr) {
  // Intl.NumberFormat JavaScript has a number formatter (part of the Internationalization API).
  const options = {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  };
  const formatter = new Intl.NumberFormat("pt-BR", options);
  return formatter.format(strVlr); /* $2,500.00 */
  console.log(formatter.format(2500)); /* $2,500.00 */
}

//console.log(confirmaReserva());
console.log("Cheguei no fim do js de reserva");
