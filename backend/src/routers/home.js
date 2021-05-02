const express = require('express');

const router = new express.Router();

// cadastro de usuário
router.get('/', (req, res) =>{
    // checa se há algum token presente, se sim, retorna campos para formar a home page
    // campos podem ser, perfil do usuário logado(para mostrar no canto, como nome, foto e afins)
    // um array de notícias, que aparece por página, se o scroll for infinito, tem que ver com o front como
    // que fica para mandar mensagem para o back para pegar mais notícias do bd
    res.send("home page");
    // se não, redireciona para '/login/'    
});

// mostra a página de login
router.get('/login', async (req, res) => {
    // envia a página de login
    res.send('login');
});

// tenta logar um usuário
router.post('/login', (req, res) =>{
    const { login, senha, email } = req.body;
    // tenta achar no bd um usuário com (login + senha) ou com (e-mail + senha)
    // se sim, loga o usuário e cria um token e o redireciona para '/'

    // se não, retorna erro, e retorna '/login' com um campo com a mensagem de erro
    
    res.send("tentando logar: ", login, email, senha);

    
});
module.exports = router;