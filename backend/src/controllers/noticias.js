const Noticia = require("../models/noticia");

module.exports = {
   
    async criarNoticia(req, res) {
        const { id, titulo, imagem, descricao } = req.body;
        // console.log(nome, "conhecido como: ", login, " que usa o e-mail: ", email);
        const resp = new Noticia(id, titulo, imagem, descricao);
        
        // procura bd por e-mail, para garantir unicidade
        res.send(resp)
    },

    async avaliacaoPositiva(req,res) {
        const {noticiaId} = req.body;
        Noticia.avaliacaoP(noticiaId, (err, data) => { 
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
        const {noticiaId} = req.body;
        Noticia.avaliacaoN(noticiaId, (err, data) => { 
            if (err) {
            res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao efetuar avaliacao negativa."});
            } else {
                // muda a entrada do bd do usuário
                res.send(data);
            } 
        });
    }
}