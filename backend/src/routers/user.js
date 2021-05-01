const express = require('express');

const router = new express.Router();

const User = require('../models/usuario');

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

module.exports = router;