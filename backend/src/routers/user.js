const express = require('express');

const router = new express.Router();

const UserController = require("../controllers/users.js");

// cadastro de usuário
router.post('/user', UserController.criarUsuario);

// mostra o perfil de um usuário
router.get('/user/:id', UserController.buscaPorId);

// altera o prefil de um usuário
router.patch('/user', UserController.alterarPerfil);

// autentifica login
router.get('/signup', UserController.login);

// promover usuario
router.put('/promote', UserController.promote)


module.exports = router;