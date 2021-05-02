const express = require('express');

const router = new express.Router();

const User = require('../models/usuario');

// cadastro de usuário
router.post('/user', (req, res) =>{
    const { nome, login, senha, email } = req.body;
    // console.log(nome, "conhecido como: ", login, " que usa o e-mail: ", email);
    const usuario = new User(nome, login, senha, email)
    
    // procura bd por e-mail, para garantir unicidade
    res.send(nome)
    
});

// mostra o perfil de um usuário
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;

    User.buscarUsuarioId(id, (err, data) => { 
        if (err) {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Customer."});
        } else {
            res.send(data);
        } 
    });
});

// altera o prefil de um usuário

router.patch('/user', async (req, res) => {
    const { nome, login, senha, email } = req.body;

    User.buscarUsuarioId(id, (err, data) => { 
        if (err) {
        res.status(500).send({
            message:
            err.message || "Some error occurred while updating the Customer."});
        } else {
            // muda a entrada do bd do usuário
            res.send(data);
        } 
    });
});

module.exports = router;