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
        sql.query("INSERT INTO USUARIO (NOME, LOGIN, SENHA, EMAIL) VALUES (?,?,?,?)", 
        [this.nome, this.login, this.senha, this.email], (err, res) => {
            if(err) {
                console.log("error: ", err);
                return;
            }
        })
        return {menssage: "Done"};
    }

    static buscarUsuarioId(usuarioID, callback){
        sql.query(`SELECT * FROM USUARIO WHERE USUARIO_ID = ${ usuarioID }`, (err, res) => {
            if(err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            if(res.length){
                // console.log("Found user: ", res[0]);
                const obj =  {
                    id: res[0].USUARIO_ID,
                    nome: res[0].NOME,
                    login: res[0].LOGIN,
                    senha: res[0].SENHA,
                    email: res[0].EMAIL,
                    tipo: res[0].TIPO
                };
                callback(null, obj);
                console.log(res);
                return;
            }

            callback({kind: "not_found"}, null);
        });
    }

    static buscarLoginESenha(login, senha, callback){
        sql.query(`SELECT * FROM USUARIO WHERE LOGIN = '${login}' AND SENHA = '${senha}'`, (err, res) => {
            if(err){
                console.log("error: ", err);
                callback(err, {
                    status: false
                });
                return;
            }

            if(res.length){
                
                callback(null, {
                    status: true,
                    id: res[0].USUARIO_ID
                });
                console.log(res[0]);
                return;
            }

            callback({kind: "not_found"}, {
                status: false
            });
        });
    }

    static alterarPerfilUsuario (usuarioId, nome, login, email, callback){
        sql.query(`UPDATE USUARIO SET NOME = '${nome}', LOGIN = '${login}', EMAIL = '${email}' WHERE USUARIO_ID = '${usuarioId}'`,
        (err, res) => {
            if(err){
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            callback(null, {
                status: true
            })
        });
    }

    static promoverUsuario(usuarioID, tipo, callback){
        sql.query(`UPDATE USUARIO SET TIPO = '${tipo}' WHERE USUARIO_ID = '${usuarioID}'`,
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                callback(err, {
                    status: false
                })
                return;
            }
        })
        callback(null, {
            status: true
        })
    }
}