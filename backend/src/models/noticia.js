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

// Porcentagem de fato e fake
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
                    callback(
                        null,
                        res
                    )
                    return;
                }
                callback(
                    { message: "Ocorreu um erro ao carregar as noticias" },
                    null
                )
            })
    }

// Adicionar Avaliações positivas e negativas (Porcentagem)
    static buscarNoticiaID(noticia_id, callback){
        sql.query(`SELECT * FROM NOTICIA WHERE noticia_id LIKE BINARY '${ noticia_id }'`,
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
                        res[0]
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
        sql.query(`INSERT INTO DENUNCIA_NOTICIA (login, noticia_id, data_denuncia, status_denuncia, conteudo) VALUES (?,?,?,?,?)`,
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

// Adicionar a rota de visualização de comentários comentários
}

