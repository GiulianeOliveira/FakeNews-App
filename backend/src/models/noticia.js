const sql = require("../database/connection");

module.exports = class Noticia {
    constructor(usuarioId, titulo, imagem, descricao){
        this.usuarioId = usuarioId;
        this.titulo = titulo;
        this.imagem = imagem;
        this.descricao = descricao;
        this.avaliacao_positiva = 0;
        this.avaliacao_negativa = 0;

        this.criaNoticia();
    }

    criaNoticia(){
        sql.query("INSERT INTO NOTICIA (USUARIO_ID, TITULO, IMAGEM, DESCRICAO) VALUES (?,?,?,?)", 
        [this.usuarioId, this.titulo, this.imagem, this.descricao], (err,res) => {
        if(err) {
            console.log("error: ", err);
            return {err};
        }
        return {menssage: "Done"}
        });
    }

    static avaliacaoP(noticiaId, callback){
        sql.query(`SELECT AVALIACAO_POSITIVA FROM NOTICIA WHERE NOTICIA_ID = '${noticiaId}'`, 
        (err,res) => {
        if(err) {
            console.log("error: ", err);
            callback(err, null)
            return;
        }
        if(res){
            const obj = {pos: Number(res[0].AVALIACAO_POSITIVA)};
            let pos = obj.pos + 1;
            sql.query(`UPDATE NOTICIA SET AVALIACAO_POSITIVA = '${pos}' WHERE NOTICIA_ID = '${noticiaId}'`, 
            (error,resp) => { 
                if(error) {
                    console.log("error: ", error);
                    callback(error, {status: false})
                    return;
                }
                callback(null, {status: true});
                return;
            });
            return;
        }
        callback(err, {status: false});
        });
    }

    static avaliacaoN(noticiaId, callback){
        sql.query(`SELECT AVALIACAO_NEGATIVA FROM NOTICIA WHERE NOTICIA_ID = '${noticiaId}'`, 
        (err,res) => {
        if(err) {
            console.log("error: ", err);
            callback(err, null)
            return;
        }
        if(res){
            const obj = {neg: Number(res[0].AVALIACAO_NEGATIVA)};
            let neg = obj.neg + 1;
            sql.query(`UPDATE NOTICIA SET AVALIACAO_NEGATIVA = '${neg}' WHERE NOTICIA_ID = '${noticiaId}'`, 
            (error,resp) => { 
                if(error) {
                    console.log("error: ", error);
                    callback(error, {status: false})
                    return;
                }
                callback(null, {status: true});
                return;
            });
            return;
        }
        callback(err, {status: false});
        });
    }
}

