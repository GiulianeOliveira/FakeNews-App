const express = require('express');

const router = new express.Router();

const NoticiaController = require("../controllers/noticias.js");

// criar noticia
router.post('/crianoticia', NoticiaController.criarNoticia);

// visualizar noticias
router.get('/visualizarnoticia', NoticiaController.visualizarNoticias);

// visualizar noticia id
router.get('/visualizarnoticia/:id', NoticiaController.visualizarNoticiaID);

// adiciona avaliacao positiva na noticia
router.put('/avaliar', NoticiaController.avaliacao);

// deleta noticia
router.delete('/delete', NoticiaController.deletarNoticia);

// denunciar noticia
router.post('/denuncia', NoticiaController.denunciarNoticia);

// visualizar noticias denunciadas em espera
router.get('/noticiadenuncia', NoticiaController.visualizarNoticiaDenuncia);

// comentar noticia
router.post('/comentarnoticia',NoticiaController.comentarNoticia);

// visualizar comentários pelo id da noticia
router.get('/visualizarcomentarios/:noticia_id', NoticiaController.visualizarComentario);

// ignorar uma denuncia da noticia
router.put('/denuncia/ignorar', NoticiaController.ignorarDenuncia)

module.exports = router;