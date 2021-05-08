const sql = require("../database/connection");

module.exports = class Noticia {
    constructor(login, titulo, imagem, descricao){
        this.login = login;
        this.titulo = titulo;
        this.imagem = imagem;
        this.descricao = descricao;
        this.avaliacao_positiva = 0;
        this.avaliacao_negativa = 0;

        this.criaNoticia();
    }

    criaNoticia(){
        sql.query("INSERT INTO NOTICIA (login, titulo, imagem, descricao) VALUES (?,?,?,?)", 
        [this.login, this.titulo, this.imagem, this.descricao], (err,res) => {
        if(err) {
            console.log("error: ", err);
            return {err};
        }
        return {message: "Done"}
        });
    }

    static avaliacaoP(noticiaId, login, callback){
        sql.query(`INSERT INTO AVALIA_ESPECIALISTA_NOTICIA (login, noticia_id, avaliacao) VALUES (?,?,?)`,
        [login, noticiaId, 'fato'], 
        (err,res) => {
            if (err){
                callback(
                    err,
                    null
                )
                return;
            }
            if (res){
                callback(
                    null,
                    {status: true}
                )
                return;
            }
            callback(
                {message: "Ocorreu um erro ao avaliar a noticia positivamente"},
                null
            )
        });  
    }

    static avaliacaoN(noticiaId, login, callback){
        sql.query(`INSERT INTO AVALIA_ESPECIALISTA_NOTICIA (login, noticia_id, avaliacao) VALUES (?,?,?)`,
        [login, noticiaId, 'fake'], 
        (err,res) => {
            if (err){
                callback(
                    err,
                    null
                )
                return;
            }
            if (res){
                callback(
                    null,
                    {status: true}
                )
                return;
            }
            callback(
                {message: "Ocorreu um erro ao avaliar a noticia negativamente"},
                null
            )
        });
    }
}

