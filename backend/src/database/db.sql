-- DATABASE FAKE NEWS APP


CREATE DATABASE FAKENEWSAPP;

-- usar o banco criado

USE FAKENEWSAPP;

-- ver as tables que tem no banco


SHOW TABLES;

-- criar tabela usuário

CREATE TABLE USUARIO (
    login VARCHAR(50) BINARY NOT NULL,
    nome TEXT NOT NULL,
    sobrenome TEXT NOT NULL,
    senha TEXT NOT NULL,
    email VARCHAR(256) BINARY NOT NULL UNIQUE,
    tipo ENUM('normal', 'admin') DEFAULT 'normal',
    especialista  BIT NOT NULL,
    PRIMARY KEY (`login`)
);


-- criar tabela denunciaUsuario

CREATE TABLE DENUNCIA_USUARIO (
    login_denunciante VARCHAR(50) BINARY NOT NULL,
    login_denunciado VARCHAR(50) BINARY NOT NULL,
    data DATE NOT NULL,
    status ENUM('em_espera', 'aprovado', 'reprovado') DEFAULT "em_espera",
    conteudo TEXT NOT NULL,
    PRIMARY KEY (`login_denunciante`, `login_denunciado`),
    FOREIGN KEY (`login_denunciante`) REFERENCES `USUARIO`(`login`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`login_denunciado`) REFERENCES `USUARIO`(`login`) ON UPDATE CASCADE ON DELETE CASCADE
);


-- criar tabela notícia
CREATE TABLE NOTICIA (
    noticia_id INT AUTO_INCREMENT,
    login VARCHAR(50) BINARY NOT NULL,
    titulo TEXT NOT NULL,
    imagem TEXT,
    descricao TEXT,
    PRIMARY KEY (`noticia_id`),
    FOREIGN KEY (`login`) REFERENCES `USUARIO`(`login`) ON UPDATE CASCADE ON DELETE CASCADE
);

-- criar tabela denunciaNoticia
CREATE TABLE DENUNCIA_NOTICIA (
    login VARCHAR(50) BINARY NOT NULL,
    noticia_id INT NOT NULL,
    data_denuncia DATE NOT NULL,
    status_denuncia ENUM('em_espera', 'aprovado', 'reprovado') DEFAULT "em_espera",
    conteudo TEXT NOT NULL,
    PRIMARY KEY (`login`,`noticia_id`),
    FOREIGN KEY (`login`) REFERENCES `USUARIO`(`login`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`noticia_id`) REFERENCES `NOTICIA` (`noticia_id`) ON UPDATE CASCADE ON DELETE CASCADE
);

-- criar tabela comentário
CREATE TABLE COMENTARIO (
    sequencia INT NOT NULL,
    noticia_id INT NOT NULL,
    login VARCHAR(50) BINARY NOT NULL,
    data DATETIME NOT NULL,
    conteudo TEXT NOT NULL,
    PRIMARY KEY (`sequencia`,`noticia_id`,`login`),
    FOREIGN KEY (`login`) REFERENCES `USUARIO`(`login`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`noticia_id`) REFERENCES `NOTICIA` (`noticia_id`) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE AVALIA_ESPECIALISTA_NOTICIA (
    login VARCHAR(50) BINARY NOT NULL,
    noticia_id INT NOT NULL,
    avaliacao ENUM('fato', 'fake') DEFAULT "fake",
    PRIMARY KEY (`login`, `noticia_id`),
    FOREIGN KEY (`login`) REFERENCES `USUARIO`(`login`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`noticia_id`) REFERENCES `NOTICIA` (`noticia_id`) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE REQUISICAO_ESPECIALISTA (
    login VARCHAR(50) BINARY NOT NULL,
    formacao TEXT NOT NULL,
    descricao TEXT NOT NULL,
    certificado text NOT NULL,
    status ENUM('em_espera', 'aprovado', 'reprovado') DEFAULT "em_espera",
    PRIMARY KEY (`login`),
    FOREIGN KEY (`login`) REFERENCES `USUARIO`(`login`) ON UPDATE CASCADE ON DELETE CASCADE
);


-- comandos que podem ser úteis:

-- para ver os tipos de cada tabela e suas keys: 
-- DESCRIBE NOME_TABELA;

-- para remover uma tabela:
-- DROP TABLE NOME_TABELA;

-- mudar uma coluna da tabela: 
-- ADD para adicionar; DROP COLUMN para remover;
-- ALTER TABLE NOME_TABELA ADD NOME_COLUNA TIPO_COLUNA;

-- adicionando dados fictícios para teste:
-- se os valores estiverem na mesma ordem das colunas, não precisamos especificar as colunas
-- INSERT INTO USUARIO (USUARIO_ID, NOME, SENHA, EMAIL) VALUES 
-- ('andressa.werner', 'Andressa', 'senhaforte', 'awkpereira@inf.ufpel.edu.br'),
-- ('giu.oliveira', 'Giuliane', 'senhafraca', 'giuzinha@inf.ufpel.edu.br');

-- INSERT INTO DENUNCIA_USUARIO (USUARIO_DENUNCIANTE_ID, USUARIO_DENUNCIADO_ID, DATA_DENUNCIA, CONTEUDO) VALUES 
-- ('andressa.werner', 'giu.oliveira', '2021-04-25', 'Disseminadora de Fake News da pesada.');

-- INSERT INTO NOTICIA (USUARIO_ID, TITULO, DESCRICAO) VALUES 
-- ('andressa.werner', 'Notícia Verdadeirah', 'Cinco patinhos foram passear. No meio do caminho, foram sequestrados e nunca mais voltaram.');

-- INSERT INTO DENUNCIA_NOTICIA (USUARIO_ID, NOTICIA_ID, DATA_DENUNCIA, CONTEUDO) VALUES 
-- ('andressa.werner', 1, '2021-04-25', 'Os patinhos só foram no parque, logo voltaram pra casa.');

-- INSERT INTO COMENTARIO (USUARIO_ID, NOTICIA_ID, DATA_COMENTARIO, CONTEUDO) VALUES 
-- ('andressa.werner', 1, '2021-04-25 18:00', 'Muito triste este sequestro'),
-- ('giu.oliveira', 1, '2021-04-25 18:36', 'Sinto falta dos patinhos. Passavam aqui na frente todos os dias.');

-- INSERT INTO COMENTARIO (USUARIO_ID, NOTICIA_ID, DATA_COMENTARIO, CONTEUDO, COMENTARIO_PAI_ID) VALUES 
-- ('andressa.werner', 1, '2021-04-25 18:00', 'Sinto pela sua perda!', 2);

-- visualizar todo o conteúdo da tabela:
-- SELECT * FROM NOME_TABELA;