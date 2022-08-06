const bigInt = require('big-integer');

function geradorNumeroPrimo() {
  var numero = Math.floor(Math.random() * 1000 + 1);
  while (!verificaPrimo(numero)) {
    numero = Math.floor(Math.random() * 1000 + 1);
  }
  return numero;
}

// Verifica ser número é primo
function verificaPrimo(primo) {
  if (primo < 1) {
    return false;
  }
  else {
    for (var i = 2; i < primo; i++) {
      if (primo % i == 0)
        return false;
    }
  }
  return true;
}

function calculaTotiente(primo1, primo2) {
  return (primo1 - 1) * (primo2 - 1)
}

// Calcula MDC
function mdc(num1, num2) {
  var resto;
  do {
    resto = num1 % num2;

    num1 = num2;
    num2 = resto;

  } while (resto != 0);
  return num1;
}

// Calcula MMC
function mmc(num1, num2) {
  return num1 * (num2 / mdc(num1, num2));
}

function aleatorioCoprimo(coprimos) {
  var index = Math.floor(Math.random() * coprimos.length);
  return coprimos[index];
}

function gerarChavePrivada(chavePublica, totiente) {
  var i = 1;
  while (true) {
    if ((chavePublica * i) % totiente == 1) {
      return i;
    }
    i++;
    if (i > 1000) {
      return i;
    }
  }
}

function converteStringAscii(msg) {
  var ascii = [];
  for (i in msg) {
    ascii.push(msg[i].charCodeAt());
  }
  return ascii;
}

function converteAsciiString(msg) {
  var string = [];
  for (i in msg) {
    string.push(String.fromCharCode(msg[i]));
  }
  return string;
}


function criptografar(msg, chavePublica, n) {
  var msgCriptografada = [];
  for (i in msg) {
    //msgCriptografada.push(new Decimal(Math.pow(msg[i], chavePublica) % n));
    msgCriptografada.push(bigInt(msg[i]).modPow(chavePublica, n)); 
  }
  return msgCriptografada;
}

function descriptografar(msg, chavePrivada, n) {
  var msgdesCriptografada = [];
  for(i in msg){
    //msgdesCriptografada.push(new Decimal(Math.pow(msg[i], chavePrivada) % n));
    msgdesCriptografada.push(bigInt(msg[i]).modPow(chavePrivada, n)); 
  }
  return msgdesCriptografada;
}



function gerarChaves() {
  // Primeiro passo: gerar 2 números primos.
  var primo1 = geradorNumeroPrimo();
  var primo2 = geradorNumeroPrimo();
  while (primo1 == primo2) {
    primo2 = geradorNumeroPrimo();
  }

  // Segundo passo: Calcular produto dos primos.
  var n = primo1 * primo2;

  // Terceiro passo: Calcular Totiente. 
  var totiente = mmc(primo1 - 1, primo2 - 1)

  //Escolha um número “e”(chave pública) que seja um dos coprimos de n
  var coprimos = [];
  for (var i = 2; i < totiente - 1; i++) { // 1 < E < phi(N)
    if (mdc(n, i) == 1) {
      coprimos.push(i);
    }
  }
  var chavePublica = aleatorioCoprimo(coprimos);

  var chavePrivada = gerarChavePrivada(chavePublica, totiente);
  console.log(chavePrivada);
  if (chavePrivada != 1001) {
    console.log(`Numero primo: ${primo1}`)
    console.log(`Numero primo: ${primo2}`)
    console.log(`Valor N: ${n}`)
    console.log(`Valor Totiente: ${totiente}`)
    //console.log(`Valor Coprimos: ${coprimos}`)
    console.log(`Valor Chave Pública: ${chavePublica}`)
    console.log(`Valor Chave Privada: ${chavePrivada}`)

    // Mensagem a ser convertida em Ascii para ser criptografada
    var msg = "Gustavo";
    console.log(`Mensagem -> ${msg}`)
    var ascii = converteStringAscii(msg);
    console.log(`Mensagem em ASCII -> ${ascii}`)
    var msg = converteAsciiString(ascii);
    console.log(`Mensagem normal -> ${msg}`)

    var msgCriptografada = criptografar(ascii, chavePublica, n);
    console.log(`Mensagem Criptografada -> ${msgCriptografada}`)

    var msgDescriptogradada = descriptografar(msgCriptografada, chavePrivada, n);
    console.log(`Mensagem Descriptografada -> ${msgDescriptogradada}`)

    // Mensagem ser convertida em String para ser descriptografada
    var msg = converteAsciiString(msgDescriptogradada);
    console.log(`Mensagem normal -> ${msg}`)

  }
  else {
    gerarChaves();
  }
}

gerarChaves();