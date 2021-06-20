const sql = require("../database/connection");
const bcrypt = require('bcrypt');

module.exports = class Usuario {
    constructor(nome,sobrenome, login, senha, email){
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.login = login;
        this.senha = senha;
        this.email = email;
        this.tipo = "NORMAL";

        return this;
    }

    criarUsuario(callback){
/*         const senha_criptografada = bcrypt.hashSync(this.senha, 10); */
        const senha_criptografada = this.senha;
        sql.query("INSERT INTO USUARIO (nome, sobrenome, login, senha, email, especialista) VALUES (?,?,?,?,?,?)", 
        [this.nome, this.sobrenome, this.login, senha_criptografada, this.email, 0], (err, res) => {
            if(err) {
                callback(err, null);
                return;
            }
            if (res) {
                callback(
                    null, 
                    {
                    login: this.login,
                    nome: this.nome,
                    sobrenome: this.sobrenome
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
                    sobrenome: res[0].sobrenome,
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
                   /* if (bcrypt.compareSync(senha, res[0].senha)){ */
                   if (senha == res[0].senha){
                        callback(
                            null, 
                            {
                            status: true,
                            login: res[0].login,
                            nome: res[0].nome,
                            sobrenome: res[0].sobrenome,
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

// Alterar login e senha
    static alterarPerfilUsuario (nome, sobrenome, login, email, senha, novoLogin, callback){
        // caso queira alterar o login, a funcao nao funciona
        sql.query(`UPDATE USUARIO SET nome = '${nome}', sobrenome = '${sobrenome}', email = '${email}', senha = '${senha}', login = '${novoLogin}' WHERE login LIKE BINARY '${login}'`,
        (err, res) => {
            if(err){
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            if (res != undefined){
                sql.query(`SELECT * FROM USUARIO WHERE login LIKE BINARY '${novoLogin}'`, (err, res) => {
                    if(err){
                        callback(err, {
                            status: false
                        });
                        return;
                    }
                    if(res){  
                        if (res[0] != undefined){
                            callback(
                                null, 
                                {
                                    status: true,
                                    login: res[0].login,
                                    nome: res[0].nome,
                                    sobrenome: res[0].sobrenome,
                                    email: res[0].email,
                                    tipo: res[0].tipo,
                                    especialista: res[0].especialista[0] ? true : false
                                }
                            )                            
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
                return;
            }
            callback(
                {message: "Usuario inexistente"}, 
                {status: false}
            )
        });
    }

    static promoverUsuario(login, status, callback){
        if(status){
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
                    sql.query(`UPDATE REQUISICAO_ESPECIALISTA SET status = 'aprovado' WHERE login LIKE BINARY '${login}'`,
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
                                    { message: "A requisição não existe" },
                                    { status: false }
                                )
                                return;
                            }

                        }
                        callback(
                            { message: "Ocorreu um erro ao promover usuario" },
                            { status: false }
                        )
                    });
                    return;
                }
                callback(
                    {message: "Erro ao promover usuário"}, 
                    {status: false}
                )
            })
        }
        else {
            sql.query(`UPDATE REQUISICAO_ESPECIALISTA SET status = 'reprovado' WHERE login LIKE BINARY '${login}'`,
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
                            { message: "A requisição não existe" },
                            { status: false }
                        )
                        return;
                    }

                }
                callback(
                    { message: "Ocorreu um erro ao promover usuario" },
                    { status: false }
                )
            });
            return;
        }
    }

    static avaliarUsuarioDenunciado(login_denunciante,login_denunciado, status, callback){
        if(status){
            sql.query(`UPDATE DENUNCIA_USUARIO SET status = 'aprovado' WHERE login_denunciante = '${login_denunciante}' AND login_denunciado = '${login_denunciado}'`,
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
                            { message: "A requisição não existe" },
                            { status: false }
                        )
                        return;
                    }

                }
                callback(
                    { message: "Ocorreu um erro ao avaliar usuario" },
                    { status: false }
                )
            });
            return;
        }
        else {
            sql.query(`UPDATE DENUNCIA_USUARIO SET status = 'reprovado' WHERE login_denunciante = '${login_denunciante}' AND login_denunciado = '${login_denunciado}'`,
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
                            { message: "A requisição não existe" },
                            { status: false }
                        )
                        return;
                    }

                }
                callback(
                    { message: "Ocorreu um erro ao avaliar usuario" },
                    { status: false }
                )
            });
            return;
        }
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

// Remover data
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

    static listarUsuarioDenuncia(callback){
        sql.query("SELECT * FROM DENUNCIA_USUARIO WHERE status = 'em_espera'", (err, res) => {
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
                    res
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

    static solicitarPromocao(login, formacao, descricao, certificado, callback){
        sql.query("INSERT INTO REQUISICAO_ESPECIALISTA (login, formacao, descricao ,certificado) VALUES (?,?,?,?)", 
        [login, formacao, descricao, certificado], (err, res) => {
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

    static listarUsuarioAcessoEspecialista(callback){
        sql.query("SELECT * FROM REQUISICAO_ESPECIALISTA WHERE status = 'em_espera'", (err, res) => {
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
                    res
                )
                return;
            }
            callback(
                {message: "Erro ao listar usuários que pediram acesso"}, 
                null
            )
        })
        return {message: "Done"};
    }

}