const { buscarLoginESenha, avaliarUsuarioDenunciado } = require("../models/usuario");
const User = require("../models/usuario");

module.exports = {
    async criarUsuario(req, res) {
        const { nome, sobrenome, login, senha, email } = req.body;
        // console.log(nome, "conhecido como: ", login, " que usa o e-mail: ", email);
        const usuario = new User(nome, sobrenome, login, senha, email);
        
        usuario.criarUsuario((err, data) => {
            if (err) {
                res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao cadastrar o Usuário"});
            } else {
                res.send(data);
            } 
        });
    },

    async buscaPorLogin(req, res) {
        const { login } = req.params;
        User.buscarUsuarioLogin(login, (err, data) => { 
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
        const {nome, sobrenome, login, email, senha, novo_login } = req.body;
    
        User.alterarPerfilUsuario(nome, sobrenome, login, email, senha, novo_login, (err, data) => { 
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
        const { login, status } = req.body;
        User.promoverUsuario(login, status, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                    err.message || "Algum erro ocorreu ao promover usuario."});
                } else {
                    res.send(data);
                } 
        })
    },

    async avaliarUsuarioDenunciado(req,res){
        const { login_denunciante, login_denunciado, status } = req.body;
        User.avaliarUsuarioDenunciado(login_denunciante, login_denunciado, status, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                    err.message || "Algum erro ocorreu ao avaliar usuario."});
                } else {
                    res.send(data);
                } 
        })
    },

    async deletarUsuario(req,res) {
        const {login} = req.params;
        User.removerUsuario(login, (err, data) => { 
            if (err) {
                res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao deletar o usuario"});
            } else {
                res.send(data);
            } 
        });
    }, 
    
    async denunciaUsuario(req, res) {
        const { denunciante, denunciado, data, conteudo } = req.body;
        // data format: AAAA-MM-DD	
        User.denunciarUsuario(denunciante, denunciado, data, conteudo, (err, data) => { 
            if (err) {
                res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao denunciar o usuario"});
            } else {
                res.send(data);
            } 
        });
        
    },

    async visualizarUsuarioDenuncia(req, res) {
        User.listarUsuarioDenuncia((err, data) => { 
            if (err) {
                res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao visualizar usuarios denunciados"});
            } else {
                res.send(data);
            } 
        });
        
    },

    async pedirPromocao(req, res){
        const login = req.query.login;
        const {formacao, descricao, certificado} = req.body;
        
        User.solicitarPromocao(login, formacao, descricao, certificado, (err, data) => {
            if (err) {
                res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao denunciar o usuario"});
            } else {
                res.send(data);
            } 
        })
    },

    async visualizarUsuarioAcesso(req, res) {
        User.listarUsuarioAcessoEspecialista((err, data) => { 
            if (err) {
                res.status(500).send({
                message:
                err.message || "Algum erro ocorreu ao visualizar usuarios que pediram acesso de especialista"});
            } else {
                res.send(data);
            } 
        });
        
    }
    
    
}