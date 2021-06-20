const express = require('express');

const router = new express.Router();

const UserController = require("../controllers/users.js");

// cadastro de usuário
router.post('/user', UserController.criarUsuario);

// mostra o perfil de um usuário
router.get('/user/:login', UserController.buscaPorLogin);

// altera o prefil de um usuário
router.put('/user', UserController.alterarPerfil);

// autentifica login
router.post('/signin', UserController.login);

// promover usuario
router.put('/promote', UserController.promote)

// deleta usuario
router.delete('/delete/:login', UserController.deletarUsuario);

// denuncia usuario
router.post('/report', UserController.denunciaUsuario);

// visualizar usuários denunciados em espera
router.get('/usuariodenuncia', UserController.visualizarUsuarioDenuncia);

// solicitar acesso especialista
router.post('/askpromotion', UserController.pedirPromocao);
// /askpromotion?login=user1Login

// visualizar usuários acesso especialista
router.get('/usuarioacesso', UserController.visualizarUsuarioAcesso);

module.exports = router;