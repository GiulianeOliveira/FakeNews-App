const sql = require("../database/connection");
const bcrypt = require('bcrypt');

module.exports = class Usuario {
    constructor(nome, login, senha, email){
        this.nome = nome;
        this.login = login;
        this.senha = senha;
        this.email = email;
        this.tipo = "NORMAL";

        return this;
    }

    criarUsuario(callback){
        const senha_criptografada = bcrypt.hashSync(this.senha, 10);
        sql.query("INSERT INTO USUARIO (nome, login, senha, email, especialista) VALUES (?,?,?,?,?)", 
        [this.nome, this.login, senha_criptografada, this.email, 0], (err, res) => {
            if(err) {
                callback(err, null);
                return;
            }
            if (res) {
                callback(
                    null, 
                    {
                    login: this.login,
                    nome: this.nome
                    }
                );  
                return;
            }
            callback({message: "Erro ao cadastrar usuario"}, null);
        });
    }

    static buscarUsuarioLogin(login, callback){
        sql.query(`SELECT * FROM USUARIO WHERE login LIKE BINARY '${ login }'`, (err, res) => {
            if(err) {
                callback(err, null);
                return;
            }

            if(res.length){
                // console.log("Found user: ", res[0]);
                const obj =  {
                    login: res[0].login,
                    nome: res[0].nome,
                    email: res[0].email,
                    tipo: res[0].tipo,
                    especialista: res[0].especialista[0] ? true : false
                };
                callback(null, obj);
                console.log(res);
                return;
            }

            callback({message: "Usuario não encontrado"}, null);
        });
    }

    static buscarLoginESenha(login, senha, callback){
        //const senha_criptografada = bcrypt.hashSync(senha, 10);
        //console.log(senha_criptografada)
        sql.query(`SELECT * FROM USUARIO WHERE login LIKE BINARY '${login}'`, (err, res) => {
            if(err){
                callback(err, {
                    status: false
                });
                return;
            }
            if(res){   
                if (res[0] != undefined){
                   if (bcrypt.compareSync(senha, res[0].senha)){
                        callback(
                            null, 
                            {
                            status: true,
                            login: res[0].login,
                            nome: res[0].nome,
                            email: res[0].email,
                            tipo: res[0].tipo,
                            especialista: res[0].especialista[0] ? true : false
                            }
                        );
                    }else{
                        callback(
                            {message: "Senha incorreta"}, {
                            status: false
                        });
                    }
                    
                }else{
                    callback(
                        {message: "Usuario não encontrado"}, {
                        status: false
                    });
                }
                
                return;
            }
            callback(
                {message: "Usuario não encontrado"}, 
                {status: false}
            );
        });
    }

    static alterarPerfilUsuario (nome, login, email, callback){
        // caso queira alterar o login, a funcao nao funciona
        sql.query(`UPDATE USUARIO SET nome = '${nome}', email = '${email}' WHERE login LIKE BINARY '${login}'`,
        (err, res) => {
            if(err){
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            if (res){
                callback(null, {
                    status: true
                })
                return;
            }
            callback(
                {message: "Usuario inexistente"}, 
                {status: false}
            )
        });
    }

    static promoverUsuario(login, callback){
        sql.query(`UPDATE USUARIO SET especialista = 1 WHERE login LIKE BINARY '${login}'`,
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                callback(err, {
                    status: false
                })
                return;
            }
            if (res) {
                callback(null, {
                    status: true}
                )
                return;
            }
            callback(
                {message: "Erro ao promover usuário"}, 
                {status: false}
            )
        })
    }

    static removerUsuario(login,callback){
        sql.query(`DELETE FROM USUARIO WHERE login LIKE BINARY '${login}'`,
        (err,res) =>{
            if(err) {
                callback(
                    err, 
                    {status: false}
                )
                return;
            }
            if (res) {
                callback(
                    null, 
                    {status: true}
                )
                return;
            }
            callback(
                {message: "Erro ao deletar usuário"}, 
                {status: false}
            )
        })
    }

    static denunciarUsuario(denunciante,denunciado,data,conteudo, callback){
        sql.query("INSERT INTO DENUNCIA_USUARIO (login_denunciante, login_denunciado, data, conteudo) VALUES (?,?,?,?)", 
        [denunciante, denunciado, data, conteudo],  (err, res) => {
            if(err){
                callback(
                    err, 
                    {status: false}
                )
                return;
            }
            if (res) {
                callback(
                    null, 
                    {status: true}
                )
                return;
            }
            callback(
                {message: "Erro ao denunciar usuário"}, 
                {status: false}
            )
        })
        return {message: "Done"};
    }

    static solicitarPromocao(login, callback){
        sql.query("INSERT INTO REQUISICAO_ESPECIALISTA (login) VALUES (?)", 
        [login], (err, res) => {
            if(err){
                callback(
                    err, 
                    {status: false}
                )
                return;
            }
            if (res) {
                callback(
                    null, 
                    {status: true}
                )
                return;
            }
            callback(
                {message: "Erro ao pedir por promocao"}, 
                {status: false}
            )
        })
        return {message: "Done"};
    }



}