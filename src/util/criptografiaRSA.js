const bigInt = require('big-integer');

bits = 18;

class RSA {
  static gerarPrimoAleatorio() {
    // Biblioteca bigInt para conseguir processar números muito grandes
    // Bits = Capacidade dos números
    const min = bigInt.one.shiftLeft(bits/2).prev();
    const max = bigInt.one.shiftLeft(bits).prev();
    console.log(min)
    console.log(max)

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

    //Escolha um número “e”(chave pública) que seja um dos coprimos de totiente
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

    var ascii = this.converteStringAscii(msg);

    for (var i in ascii) {
      msgCriptografada.push(bigInt(ascii[i]).modPow(chavePublica, n)); 
    }

    return msgCriptografada;
  }

  static descriptografar(msg, chavePrivada, n) {
    msg = msg.split(",");
    var msgDescriptografada = [];

    for(var i in msg){
      msgDescriptografada.push(bigInt(parseInt(msg[i])).modPow(chavePrivada, n)); 
    }

    var msgFinal = this.converteAsciiString(msgDescriptografada).toString()
    msgFinal = msgFinal.replace(/,/g, "")

    return msgFinal;
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
 
RSA.gerarPrimoAleatorio();
module.exports = RSA;