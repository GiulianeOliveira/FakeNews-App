const { denunciarNoticia, comentarNoticia } = require("../models/noticia");
const Noticia = require("../models/noticia");

module.exports = {
   
    async criarNoticia(req, res) {
        const { login, titulo, imagem, descricao } = req.body;
        // console.log(nome, "conhecido como: ", login, " que usa o e-mail: ", email);
        const resp = new Noticia(login, titulo, imagem, descricao);
        
        // procura bd por e-mail, para garantir unicidade
        res.send(resp)
    },

    async avaliacao(req,res) {
        const {noticiaId, login, avaliacao} = req.body;
        Noticia.avaliacao(noticiaId, login, avaliacao, (err, data) => { 
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

    async visualizarNoticiaID(req,res) {
        const {id} = req.params;
        Noticia.buscarNoticiaID(id, (err, data) => { 
            if (err) {
            res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao carregar a noticia"});
            } else {
                // muda a entrada do bd do usuário
                res.send(data);
            } 
        });
    },

    async deletarNoticia(req,res) {
        const {noticia_id} = req.query;
        Noticia.deletarNoticia(noticia_id, (err, data) => { 
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

    async denunciarNoticia(req, res) {
        const {login, noticia_id} = req.query;
        const {conteudo, data} = req.body;
        Noticia.denunciarNoticia(login, noticia_id, data, conteudo, (err, resp) => {
            if(err){
                res.status(500).send({
                    message: err.message || "Erro ao denunciar noticia"
                })
            }else {
                res.send(resp)
            }
        });
    },

    async comentarNoticia(req,res) {
        const {noticiaId, login, data, conteudo} = req.body;
        Noticia.comentarNoticia(noticiaId, login, data, conteudo, (err, data) => {
            if(err){
                res.status(500).send({
                    message: err.message || "Erro ao comentar noticia"
                })
            }else {
                res.send(data)
            }
        });
    },
    async visualizarComentario(req,res) {
        const {noticia_id} = req.params;
        Noticia.visualiarComentarios(noticia_id, (err, data) => { 
            if (err) {
            res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao visualizar comentarios"});
            } else {
                // muda a entrada do bd do usuário
                res.send(data);
            } 
        });
    },
}