const buttonChaves = document.getElementById('gerarChaves');
buttonChaves.addEventListener('click', function (e) {
  $.get('http://localhost:5000/gerarChaves', function (data) {
    document.querySelector('#chavePublica').value = data.chaves.chavePublica;
    document.querySelector('#chavePrivada').value = data.chaves.chavePrivada;
    document.querySelector('#produtoN').value = data.chaves.n;
  })
});

const buttonCriptografar = document.getElementById('criptografar');
buttonCriptografar.addEventListener('click', function (e) {
  const msg = document.querySelector('#msg').value;
  const chavePublica = document.querySelector('#sendChavePublica').value;
  const n = document.querySelector('#sendProdutoN').value;

  $.get(`http://localhost:5000/criptografar/${msg}/${chavePublica}/${n}`, function (data) {
    document.querySelector('#mensagem_cripto').value = data.msgCriptografada;
  })
});

const buttonDescriptografar = document.getElementById('descriptografar');
buttonDescriptografar.addEventListener('click', function (e) {
  const msg = document.querySelector('#mensagem_ascii').value;
  const chavePrivada = document.querySelector('#sendChavePrivada').value;
  const n = document.querySelector('#sendProdutoN').value;

  $.get(`http://localhost:5000/descriptografar/${msg}/${chavePrivada}/${n}`, function (data) {
    document.querySelector('#mensagem_descripto').value = data.msgDescriptografada;
  })
});
