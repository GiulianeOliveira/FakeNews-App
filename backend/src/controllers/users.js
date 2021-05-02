const { buscarLoginESenha } = require("../models/usuario");
const User = require("../models/usuario");

module.exports = {
    async criarUsuario(req, res) {
        const { nome, login, senha, email } = req.body;
        // console.log(nome, "conhecido como: ", login, " que usa o e-mail: ", email);
        const usuario = new User(nome, login, senha, email)
        
        // procura bd por e-mail, para garantir unicidade
        res.send(nome)
        
    },
    async buscaPorId(req, res) {
        const { id } = req.params;
    
        User.buscarUsuarioId(id, (err, data) => { 
            if (err) {
            res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao buscar o Usuário"});
            } else {
                res.send(data);
            } 
        });
    },

    async alterarPerfil (req, res){
        const {id, nome, login, email } = req.body;
    
        User.alterarPerfilUsuario(id, nome, login, email, (err, data) => { 
            if (err) {
            res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao alterar o perfil do Usuário"});
            } else {
                // muda a entrada do bd do usuário
                res.send(data);
            } 
        });
    },
    
    async login (req, res){
        console.log(req.body);
        const {login, senha} = req.body;
    
        User.buscarLoginESenha(login, senha, (err, data) => { 
            if (err) {
            res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao efetuar login."});
            } else {
                // muda a entrada do bd do usuário
                res.send(data);
            } 
        });
    },
    async promote(req,res){
        const { id, tipo } = req.body;
        User.promoverUsuario(id, tipo, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                    err.message || "Algum erro ocorreu ao promover usuario."});
                } else {
                    res.send(data);
                } 
        })


    }
}