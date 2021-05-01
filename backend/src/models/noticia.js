const sql = require("../database/connection");

module.exports = class Noticia {
    constructor(titulo, imagem, descricao, avaliacao_positiva, avaliacao_negativa){
        this.titulo = titulo;
        this.imagem = imagem;
        this.descricao = descricao;
        this.avaliacao_positiva = avaliacao_positiva;
        this.avaliacao_negativa = avaliacao_negativa;
    }

    criaNoticia(usuarioID,noticia,result){
        sql.query("INSERT INTO NOTICIA (USUARIO_ID, TITULO, DESCRICAO) VALUES ('?','?','?')", 
            [usuarioID, noticia.titulo, noticia.descricao], (err,res) => {
                if(err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }
                })
                result(null, {menssage: "Done"})
    }

}

