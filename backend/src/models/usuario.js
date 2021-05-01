const sql = require("../database/connection");

module.exports = class Usuario {
    constructor(nome, login, senha, email, tipo){
        this.nome = nome;
        this.login = login;
        this.senha = senha;
        this.email = email;
        this.tipo = tipo;

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
        });
    }

    // static async buscarUsuarioId(usuarioID){
    //     const res = sql.query(`SELECT * FROM USUARIO WHERE USUARIO_ID = ${ usuarioID }`);
    //     console.log(fields)
    //     return fields;
    // }

    static buscarLoginESenha(login, senha){
        sql.query(`SELECT * FROM USUARIO WHERE LOGIN = ${login} AND SENHA = ${senha}`, (err, res) => {
            if(err){
                console.log("error: ", err);
                return;
            }

            if(res.length){
                console.log("Found user: ", res[0]);
                return ({
                    id: res[0].USUARIO_ID,
                    nome: res[0].NOME,
                    login: res[0].LOGIN,
                    senha: res[0].SENHA,
                    email: res[0].EMAIL,
                    tipo: res[0].TIPO
                });
            }
        })
    }
}