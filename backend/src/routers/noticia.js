const express = require('express');

const router = new express.Router();

const NoticiaController = require("../controllers/noticias.js");

// criar noticia
router.post('/crianoticia', NoticiaController.criarNoticia);

// visualizar noticias
router.get('/visualizarnoticia', NoticiaController.visualizarNoticias);

// adiciona avaliacao positiva na noticia
router.put('/positiva', NoticiaController.avaliacaoPositiva);

// adiciona avaliacao negativa na noticia
router.put('/negativa', NoticiaController.avaliacaoNegativa);

// deleta noticia
router.delete('/delete/:noticiaid', NoticiaController.deletarNoticia);

module.exports = router;