const btnAC = document.getElementById("all-clear");
const btnNumeros = document.querySelectorAll("[numeros]");
const btnOperadores = document.querySelectorAll("[operadores]");
const operacaoAtual = document.getElementsByClassName("operacaoAtual")[0];
const operacaoAnterior = document.getElementsByClassName("operacaoAnterior")[0];
const btnDelete = document.getElementById("delete");
const btnIgual = document.getElementById("igual");

class Calculadora {
  constructor(operacaoAtual, operacaoAnterior) {
    this.operacaoAtualElement = operacaoAtual;
    this.operacaoAnteriorElement = operacaoAnterior;
    this.clear();
  }

  clear() {
    this.operacaoAtual = "";
    this.operacaoAnterior = "";
    this.operacao = undefined;
  }

  mostrarNumero(numero) {
    if (this.operacaoAtual.includes(".") && numero === ".") return;

    this.operacaoAtual = `${this.operacaoAtual}${numero.toString()}`;
  }

  selecionarOperacao(operacao) {
    if (this.operacaoAtual === "") return;

    if (this.operacaoAnterior != "") {
      this.calcular();
    }

    this.operacao = operacao;
    this.operacaoAnterior = this.operacaoAtual;
    this.operacaoAtual = "";
  }

  delete() {
    this.operacaoAtual = this.operacaoAtual.toString().slice(0, -1);
  }

  calcular() {
    let resultado;

    let floatOperacaoAnterior = parseFloat(this.operacaoAnterior);
    let floatOperacaoAtual = parseFloat(this.operacaoAtual);

    switch (this.operacao) {
      case "+":
        resultado = floatOperacaoAnterior + floatOperacaoAtual;
        break;
      case "-":
        resultado = floatOperacaoAnterior - floatOperacaoAtual;
        break;
      case "/":
        resultado = floatOperacaoAnterior / floatOperacaoAtual;
        break;
      case "*":
        resultado = floatOperacaoAnterior * floatOperacaoAtual;
        break;
      default:
        resultado = "ERRO DE SINTAXE!";
    }
    this.operacaoAtual = resultado;
    this.operacaoAnterior = "";
    this.operacao = undefined;
  }

  atualizarTela() {
    this.operacaoAtualElement.innerText = this.operacaoAtual;
    this.operacaoAnteriorElement.innerText = `${this.operacaoAnterior} ${this.operacao || ""}`;
  }
}

const calculadora = new Calculadora(operacaoAtual, operacaoAnterior);

for (const numero of btnNumeros) {
  numero.addEventListener("click", () => {
    calculadora.mostrarNumero(numero.innerText);
    calculadora.atualizarTela();
  });
}

for (const operacao of btnOperadores) {
  operacao.addEventListener("click", () => {
    calculadora.selecionarOperacao(operacao.innerText);
    calculadora.atualizarTela();
  });
}

btnAC.addEventListener("click", () => {
  calculadora.clear();
  calculadora.atualizarTela();
});

btnDelete.addEventListener("click", () => {
  calculadora.delete();
  calculadora.atualizarTela();
});

btnIgual.addEventListener("click", () => {
  calculadora.calcular();
  calculadora.atualizarTela();
});
