const noticias = require("../controllers/noticias");
const sql = require("../database/connection");

module.exports = class Noticia {
    constructor(login, titulo, imagem, descricao) {
        this.login = login;
        this.titulo = titulo;
        this.imagem = imagem;
        this.descricao = descricao;
        this.avaliacao_positiva = 0;
        this.avaliacao_negativa = 0;

        this.criaNoticia();
    }

    criaNoticia() {
        sql.query("INSERT INTO NOTICIA (login, titulo, imagem, descricao) VALUES (?,?,?,?)",
            [this.login, this.titulo, this.imagem, this.descricao], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    return { err };
                }
                return { message: "Done" }
            });
    }

    static avaliacao(noticiaId, login, avaliacao,callback) {
        sql.query(`SELECT especialista FROM USUARIO WHERE login LIKE BINARY '${login}'`,
            (error, resp) => {
                if (error) {
                    callback(
                        error,
                        null
                    )
                    return;
                }
                if (resp != undefined) {
                    if (resp[0].especialista[0]) {
                        sql.query(`INSERT INTO AVALIA_ESPECIALISTA_NOTICIA (login, noticia_id, avaliacao) VALUES (?,?,?)`,
                            [login, noticiaId, avaliacao],
                            (err, res) => {
                                if (err) {
                                    callback(
                                        err,
                                        null
                                    )
                                    return;
                                }
                                if (res) {
                                    callback(
                                        null,
                                        { status: true }
                                    )
                                    return;
                                }
                                callback(
                                    { message: "Ocorreu um erro ao avaliar a noticia positivamente" },
                                    null
                                )
                            });
                    }else{
                        callback(
                            { message: "O usuario não possui autorização para avaliar a noticia." },
                            {status: false}
                        )
                    }
                    return;
                }
                callback(
                    { message: "Ocorreu um erro ao avaliar a noticia positivamente" },
                    null
                )
            })

    }

    static visualizarNoticia(callback) {
        sql.query(`SELECT x.*, COUNT(avaliacao) AS avaliacaoN FROM 
            (SELECT NOTICIA.*, COUNT(avaliacao) AS avaliacaoP FROM NOTICIA LEFT JOIN AVALIA_ESPECIALISTA_NOTICIA ON 
            AVALIA_ESPECIALISTA_NOTICIA.noticia_id = NOTICIA.noticia_id AND avaliacao = 'fato' GROUP BY noticia_id)x 
            LEFT JOIN AVALIA_ESPECIALISTA_NOTICIA ON AVALIA_ESPECIALISTA_NOTICIA.noticia_id = x.noticia_id AND avaliacao = 'fake' 
            GROUP BY noticia_id;`,
            (err, res) => {
                if (err) {
                    callback(
                        err,
                        null
                    )
                    return;
                }
                if (res) {
                    let obj = res.map(notice => {
                        let percetOfP = 50
                        let percetOfN = 50
                        if(notice.avaliacaoP != 0 || notice.avaliacaoN != 0){
                            percetOfP = (notice.avaliacaoP*100)/(notice.avaliacaoP + notice.avaliacaoN)
                            percetOfN = (notice.avaliacaoN*100)/(notice.avaliacaoP + notice.avaliacaoN)
                        }
                        return (
                            {
                                ...notice,
                                percetOfP: percetOfP,
                                percentofN: percetOfN
                            }
                            )
                    })
                    callback(
                        null,
                        obj
                    )
                    return;
                }
                callback(
                    { message: "Ocorreu um erro ao carregar as noticias" },
                    null
                )
            })
    }


    static listarsNoticiaDenuncia(callback){
        sql.query("SELECT * FROM DENUNCIA_NOTICIA LEFT JOIN NOTICIA ON DENUNCIA_NOTICIA.noticia_id=NOTICIA.noticia_id WHERE status_denuncia = 'em_espera'", 
        (err, res) => {
            if(err){
                callback(
                    err, 
                    {status: false}
                )
                return;
            }
            if (res) {
                let obj = res.map(denuncia => {
                    return (
                        {
                            login_denuncia: denuncia.login_denuncia,
                            login: denuncia.login,
                            noticia_id: denuncia.noticia_id,
                            titulo: denuncia.titulo,
                            data_denuncia: denuncia.data_denuncia,
                            status_denuncia: denuncia.status_denuncia,
                            conteudo: denuncia.conteudo
                        }
                    )
                })

                callback(
                    null, 
                    obj
                )
                return;
            }
            callback(
                {message: "Erro ao listar usuários denúnciados"}, 
                null
            )
        })
        return {message: "Done"};
    }

// Adicionar Avaliações positivas e negativas (Porcentagem)
    static buscarNoticiaID(noticia_id, callback){
        sql.query(`SELECT y.*  FROM (SELECT x.*, COUNT(avaliacao) AS avaliacaoN FROM 
        (SELECT NOTICIA.*, COUNT(avaliacao) AS avaliacaoP FROM NOTICIA LEFT JOIN AVALIA_ESPECIALISTA_NOTICIA ON 
        AVALIA_ESPECIALISTA_NOTICIA.noticia_id = NOTICIA.noticia_id AND avaliacao = 'fato' GROUP BY noticia_id)x 
        LEFT JOIN AVALIA_ESPECIALISTA_NOTICIA ON AVALIA_ESPECIALISTA_NOTICIA.noticia_id = x.noticia_id AND avaliacao = 'fake' 
        GROUP BY noticia_id)y WHERE y.noticia_id = ${noticia_id};`,
            (err, res) => {
                if (err) {
                    callback(
                        err,
                        null
                    )
                    return;
                }
                if (res) {
                    let percetOfP = 50
                    let percetOfN = 50

                    if( res[0].avaliacaoP != 0 || res[0].avaliacaoN != 0){
                        percetOfP = (res[0].avaliacaoP*100)/(res[0].avaliacaoP + res[0].avaliacaoN)
                        percetOfN = (res[0].avaliacaoN*100)/(res[0].avaliacaoP + res[0].avaliacaoN)
                    }

                    callback(
                        null,
                        {
                            ...res[0],
                            percetOfP: percetOfP,
                            percentofN: percetOfN
                        }
                    )
                    return;
                }
                callback(
                    { message: "Ocorreu um erro ao carregar as noticias" },
                    null
                )
            })
    }

    static deletarNoticia(noticia_id, callback) {
        sql.query(`DELETE FROM NOTICIA WHERE noticia_id = '${noticia_id}'`,
            (err, res) => {
                if (err) {
                    callback(
                        err,
                        { status: false }
                    )
                    return;
                }
                if (res) {
                    if (res.affectedRows) {
                        callback(
                            null,
                            { status: true }
                        )
                        return;
                    } else {
                        callback(
                            { message: "A noticia não existe" },
                            { status: false }
                        )
                        return;
                    }

                }
                callback(
                    { message: "Ocorreu um erro ao deletar a noticia" },
                    { status: false }
                )
            });
    }

    static denunciarNoticia(login, noticiaID, data, conteudo, callback) {
        sql.query(`INSERT INTO DENUNCIA_NOTICIA (login_denuncia, noticia_id, data_denuncia, status_denuncia, conteudo) VALUES (?,?,?,?,?)`,
            [login, noticiaID, data, "em_espera", conteudo],
            (err, res) => {
                if (err) {
                    callback(
                        err,
                        null
                    )
                    return;
                }
                if (res) {
                    callback(
                        null,
                        { status: true }
                    )
                    return;
                }
                callback(
                    { message: "Erro ao denunciar noticia" },
                    { status: false }
                )
            });
    }

    static comentarNoticia(noticiaId, login, data, conteudo, callback) {
        sql.query(`SELECT COUNT(sequencia) AS sequencia FROM COMENTARIO WHERE noticia_id = ${noticiaId}`,
            (err, res) => {
                if (err) {
                    callback(
                        err,
                        null
                    )
                    return;
                }
                if (res) {
                    sql.query(`INSERT INTO COMENTARIO (sequencia, noticia_id, login, data, conteudo) VALUES (?,?,?,?,?)`,
                        [res[0].sequencia, noticiaId, login, data, conteudo],
                        (error, resp) => {
                            if (error) {
                                callback(
                                    error,
                                    null
                                )
                                return;
                            }
                            if (resp) {
                                callback(
                                    null,
                                    { status: true }
                                )
                                return;
                            }
                            callback(
                                { message: "Erro ao comentar noticia" },
                                { status: false }
                            )
                        })
                    return
                }
                return;
            });
    }

static visualiarComentarios(noticiaId, callback) {
    sql.query(`SELECT * FROM COMENTARIO WHERE noticia_id = ${noticiaId}`,
        (err, res) => {
            if (err) {
                callback(
                    err,
                    null
                )
                return;
            }
            if (res) {   
                let obj = res.map(comment => {
                   return (
                        {
                            usuario: comment.login,
                            data: comment.data,
                            comentario: comment.conteudo
                        }
                        )
                })             
                callback(
                    null,
                    obj
                )
                return
            }
            callback(
                { message: "Erro ao visualizar o comentário" },
                null
            )
            return;
        });
}

static avaliarDenuncia(noticia_id, login, status, callback) {
    if(status){
        sql.query(`UPDATE DENUNCIA_NOTICIA SET status_denuncia = 'aprovado' WHERE noticia_id = '${noticia_id}' AND login_denuncia LIKE BINARY '${login}'`,
        (err, res) => {
            if (err) {
                callback(
                    err,
                    { status: false }
                )
                return;
            }
            if (res) {
                if (res.affectedRows) {
                    callback(
                        null,
                        { status: true }
                    )
                    return;
                } else {
                    callback(
                        { message: "A denuncia não existe" },
                        { status: false }
                    )
                    return;
                }

            }
            callback(
                { message: "Ocorreu um erro ao aprovar a denuncia" },
                { status: false }
            )
        });
    }
    else {
        sql.query(`UPDATE DENUNCIA_NOTICIA SET status_denuncia = 'reprovado' WHERE noticia_id = '${noticia_id}' AND login_denuncia LIKE BINARY '${login}'`,
        (err, res) => {
            if (err) {
                callback(
                    err,
                    { status: false }
                )
                return;
            }
            if (res) {
                if (res.affectedRows) {
                    callback(
                        null,
                        { status: true }
                    )
                    return;
                } else {
                    callback(
                        { message: "A denuncia não existe" },
                        { status: false }
                    )
                    return;
                }

            }
            callback(
                { message: "Ocorreu um erro ao reprovar a denuncia" },
                { status: false }
            )
        });
    }
   
}

}