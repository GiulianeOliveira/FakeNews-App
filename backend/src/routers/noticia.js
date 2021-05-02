const express = require('express');

const router = new express.Router();

const NoticiaController = require("../controllers/noticias.js");

// criar noticia
router.post('/crianoticia', NoticiaController.criarNoticia);

// adiciona avaliacao positiva na noticia
router.put('/positiva', NoticiaController.avaliacaoPositiva);

// adiciona avaliacao negativa na noticia
router.put('/negativa', NoticiaController.avaliacaoNegativa);

module.exports = router;