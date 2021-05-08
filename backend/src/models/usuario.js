const sql = require("../database/connection");

module.exports = class Usuario {
    constructor(nome, login, senha, email){
        this.nome = nome;
        this.login = login;
        this.senha = senha;
        this.email = email;
        this.tipo = "NORMAL";

        this.criarUsuario();
    }

    criarUsuario(){
        sql.query("INSERT INTO USUARIO (nome, login, senha, email, especialista) VALUES (?,?,?,?,?)", 
        [this.nome, this.login, this.senha, this.email, 0], (err, res) => {
            if(err) {
                console.log("error: ", err);
                return;
            }
        })
        return {message: "Done"};
    }

    static buscarUsuarioLogin(login, callback){
        sql.query(`SELECT * FROM USUARIO WHERE login = '${ login }'`, (err, res) => {
            if(err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            if(res.length){
                // console.log("Found user: ", res[0]);
                const obj =  {
                    nome: res[0].nome,
                    login: res[0].login,
                    senha: res[0].senha,
                    email: res[0].email,
                    tipo: res[0].tipo,
                    especialista: res[0].especialista
                };
                callback(null, obj);
                console.log(res);
                return;
            }

            callback({message: "Usuario não encontrado"}, null);
        });
    }

    static buscarLoginESenha(login, senha, callback){
        sql.query(`SELECT * FROM USUARIO WHERE login = '${login}' AND senha = '${senha}'`, (err, res) => {
            if(err){
                console.log("error: ", err);
                callback(err, {
                    status: false
                });
                return;
            }

            if(res.length){
                
                callback(null, {
                    status: true
                });
                console.log(res[0]);
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
        sql.query(`UPDATE USUARIO SET nome = '${nome}', email = '${email}' WHERE login = '${login}'`,
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
        sql.query(`UPDATE USUARIO SET especialista = 1 WHERE login = '${login}'`,
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
}