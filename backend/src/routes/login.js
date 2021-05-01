const express = require('express');

var router = express.router();

router.post('/signup', (req, res) =>{
    const { nome, login, senha, email } = req.body;
    // procura bd por e-mail, para garantir unicidade
    
});
