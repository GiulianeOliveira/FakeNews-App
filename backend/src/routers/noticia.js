const express = require('express');

const router = new express.Router();

const NoticiaController = require("../controllers/noticias.js");

// criar noticia
router.post('/crianoticia', NoticiaController.criarNoticia);

// visualizar noticias
router.get('/visualizarnoticia', NoticiaController.visualizarNoticias);

// adiciona avaliacao positiva na noticia
router.put('/avaliar', NoticiaController.avaliacao);

// deleta noticia
router.delete('/delete', NoticiaController.deletarNoticia);

// denunciar noticia
router.post('/denuncia', NoticiaController.denunciarNoticia);

// comentar noticia
router.post('/comentarnoticia',NoticiaController.comentarNoticia);

module.exports = router;