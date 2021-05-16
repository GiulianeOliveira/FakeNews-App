const Noticia = require("../models/noticia");

module.exports = {
   
    async criarNoticia(req, res) {
        const { login, titulo, imagem, descricao } = req.body;
        // console.log(nome, "conhecido como: ", login, " que usa o e-mail: ", email);
        const resp = new Noticia(login, titulo, imagem, descricao);
        
        // procura bd por e-mail, para garantir unicidade
        res.send(resp)
    },

    async avaliacaoPositiva(req,res) {
        const {noticiaId, login} = req.body;
        Noticia.avaliacaoP(noticiaId, login, (err, data) => { 
            if (err) {
            res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao efetuar avaliacao positiva."});
            } else {
                // muda a entrada do bd do usuário
                res.send(data);
            } 
        });
    },

    async avaliacaoNegativa(req,res) {
        const {noticiaId, login} = req.body;
        Noticia.avaliacaoN(noticiaId, login, (err, data) => { 
            if (err) {
            res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao efetuar avaliacao negativa."});
            } else {
                // muda a entrada do bd do usuário
                res.send(data);
            } 
        });
    },

    async visualizarNoticias(req,res) {
        Noticia.visualizarNoticia((err, data) => { 
            if (err) {
            res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao carregar as noticias"});
            } else {
                // muda a entrada do bd do usuário
                res.send(data);
            } 
        });
    },

    async deletarNoticia(req,res) {
        const {noticiaid} = req.params;
        Noticia.deletarNoticia(noticiaid, (err, data) => { 
            if (err) {
            res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao carregar as noticias"});
            } else {
                // muda a entrada do bd do usuário
                res.send(data);
            } 
        });
    }
}