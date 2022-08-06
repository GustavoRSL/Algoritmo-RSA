/* Para gerar a chave precisamos de algumas coisas:
1. Selecionar dois números primos p e q grandes (geralmente maior que
10100). (veja próxima seção para ver como achar números primos)
2. Calcule o valor de n = p . q
3. Calcule fn = (p -1) ×(q -1)
4. Selecione um inteiro “d” relativamente primo à fn .
5. Calculamos “e” de forma que (e . d) mod fn = 1 */

function geradorNumeroPrimo() {
  var numero = Math.floor(Math.random() * 20 + 1);
  while (!verificaPrimo(numero)) {
    numero = Math.floor(Math.random() * 20 + 1);
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

function totiente(primo1, primo2) {
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

function aleatorioCoprimo(coprimos) {
  var index = Math.floor(Math.random() * coprimos.length);
  return coprimos[index];
}

function gerarChavePrivada(chavePublica, numeroTotiente) {
  var i = 1;
  while (true) {
    if ((chavePublica * i) % numeroTotiente == 1) {
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

function criptografar(ascii, chavePublica, n){
  var msgCriptografada = [];
  for(i in ascii){
    msgCriptografada.push(Math.pow(ascii[i], chavePublica) % n);
  }
  return msgCriptografada;
}

function descriptografar(msgCriptografada, chavePrivada, n){
  var msgdesCriptografada = [];
  for(i in msgCriptografada){
    msgdesCriptografada.push(Math.pow(msgCriptografada[i], chavePrivada) % n);
  }
  return msgdesCriptografada;
}

// Funcionamento do modelo RSA
// Para calcular duas chaves, são seguidos estes passos:

function gerarChaves() {
  // 1 -> Se escolhe dois números primos.
  var p = geradorNumeroPrimo();
  var q = geradorNumeroPrimo();

  // Calcula o produto dos dois números do passo anterior e calcular a função totiente de Euler
  var n = p * q;
  var numeroTotiente = totiente(p, q);

  //Escolha um número “e”(chave pública) que seja um dos coprimos de n
  var coprimos = [];
  for (var i = 1; i < n; i++) {
    if (mdc(n, i) == 1) {
      coprimos.push(i);
    }
  }
  var chavePublica = aleatorioCoprimo(coprimos);
  // Calculando o chave privada.
  var chavePrivada = gerarChavePrivada(chavePublica, numeroTotiente);
  if (chavePrivada != 1001) {
    console.log(`Numero primo: ${p}`)
    console.log(`Numero primo: ${q}`)
    console.log(`Produto dos primo: ${n}`)
    console.log(`Número de Totiente: ${numeroTotiente}`)
    console.log(`Chave pública: ${chavePublica}`);
    console.log(`Chave privada: ${chavePrivada}`);
  }
  else {
    gerarChaves();
  }

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




  // Agora temos tudo que precisamos para criptografar usando algoritmo RSA:
  // P = 1 número primo
  // Q = 1 número primo
  // N = Produto dos numeros primosS
  // Chave pública(e)
  // Chave privada(d)
  // msg (m)
  // msgCriptografada (c)

  // Criptografando
  // c = m ^ e mod n


  // Decriptografando
  // decrypt = c ^ d mod n

  return 0;
}

gerarChaves();
