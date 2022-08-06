const bigInt = require('big-integer');

bits = 10;

class RSA {
  static gerarPrimoAleatorio() {
    // Biblioteca bigInt para conseguir processar números muito grandes
    // Bits = Capacidade dos números
    const min = bigInt.one.shiftLeft(bits - 1);
    const max = bigInt.one.shiftLeft(bits).prev();

    while (true) {
      var numero = bigInt.randBetween(min, max);
      if (numero.isProbablePrime()) {
        return numero;
      }
    }
  }

  static mdc(num1, num2) {
    var resto = bigInt();
    do {
      resto = num1.mod(num2);
      num1 = num2;
      num2 = resto;
    } while (resto != 0);
    return num1;
  }

  // Calcula MMC
  static mmc(num1, num2) {
    return num1.multiply((num2.divide(this.mdc(num1, num2))));
  }

  static calculaTotiente(primo1, primo2) {
    return primo1.prev().multiply(primo2.prev());
  }
  

  static gerarChaves() {
    var chavePublica = bigInt();
    var p = bigInt();
    var q = bigInt();
    var n = bigInt();
    var totiente = bigInt();

    // Primeiro passo: gerar 2 números primos.
    p = this.gerarPrimoAleatorio(bits);
    q = this.gerarPrimoAleatorio(bits);

    // Segundo passo: Calcular produto dos primos.
    var n = p.multiply(q);
    
    // Terceiro passo: Calcular Totiente. 
    totiente = this.calculaTotiente(p, q);

    //Escolha um número “e”(chave pública) que seja um dos coprimos de n
    while (true) {
      chavePublica = bigInt.randBetween(bigInt(2), totiente.prev());
      if (chavePublica.isProbablePrime()) {
        return {
          chavePublica,
          n,
          chavePrivada: chavePublica.modInv(totiente)
        }
      } 
    }
  }

  static criptografar(msg, chavePublica, n) {
    var msgCriptografada = [];
    for (var i in msg) {
      msgCriptografada.push(bigInt(msg[i]).modPow(chavePublica, n)); 
    }
    return msgCriptografada;
  }

  static descriptografar(msg, chavePrivada, n) {
    var msgdesCriptografada = [];
    for(var i in msg){
      //msgdesCriptografada.push(new Decimal(Math.pow(msg[i], chavePrivada) % n));
      msgdesCriptografada.push(bigInt(msg[i]).modPow(chavePrivada, n)); 
    }
    return msgdesCriptografada;
  }

  static converteStringAscii(msg) {
    var ascii = [];
    for (var i in msg) {
      ascii.push(bigInt(msg[i].charCodeAt()));
    }
    return ascii;
  }
  
  static converteAsciiString(msg) {
    var string = [];
    for (var i in msg) {
      string.push(String.fromCharCode(msg[i]));
    }
    return string;
  }

  static printarMsg(msg){
    var string = '';
    for (var i in msg) {
      string += msg[i];
    }
    return string;
  }
}

// Message
const mensagem = 'Gustavo Reis Souza Lima';

// Generate RSA keys
const chaves = RSA.gerarChaves();
console.log(chaves);

const mensagem_ascii = RSA.converteStringAscii(mensagem);
const mensagem_criptograda = RSA.criptografar(mensagem_ascii, chaves.chavePublica, chaves.n);
const mensagem_decriptograda = RSA.descriptografar(mensagem_criptograda, chaves.chavePrivada, chaves.n);
const mensagem_decodificada = RSA.converteAsciiString(mensagem_decriptograda);
const mensagem_final = RSA.printarMsg(mensagem_decodificada);

console.log('Mensagem:', mensagem);
console.log('Ascii:', mensagem_ascii.toString());
console.log('Criptograda:', mensagem_criptograda.toString());
console.log('Decriptograda:', mensagem_decriptograda.toString());
console.log('Decoded:', mensagem_decodificada.toString());
console.log('Mensagem:', mensagem_final.toString());
console.log();
console.log('Correct?', mensagem === mensagem_final);




module.exports = RSA;