const RSA = require("../util/criptografiaRSA");
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.render('index')
});

router.get("/gerarChaves", (req, res) => {
  var chaves = RSA.gerarChaves();
  res.json({
    chaves
  })
});

router.get("/criptografar/:msg/:chavePublica/:n", (req, res) => {
  const msg = req.params.msg;
  const chavePublica = req.params.chavePublica;
  const n = req.params.n;

  var msgCriptografada = RSA.criptografar(msg, chavePublica, n);
  res.json({
    msgCriptografada
  })
});

router.get("/descriptografar/:msg/:chavePrivada/:n", (req, res) => {
  const msg = req.params.msg;
  const chavePrivada = req.params.chavePrivada;
  const n = req.params.n;

  var msgDescriptografada = RSA.descriptografar(msg, chavePrivada, n);
  res.json({
    msgDescriptografada
  })
});

module.exports = router;