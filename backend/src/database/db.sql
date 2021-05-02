-- DATABASE FAKE NEWS APP


CREATE DATABASE FAKENEWSAPP;

-- usar o banco criado

USE FAKENEWSAPP;

-- ver as tables que tem no banco


SHOW TABLES;

-- criar tabela usuário

CREATE TABLE USUARIO (
    USUARIO_ID INT AUTO_INCREMENT,
    NOME TEXT NOT NULL,
    LOGIN VARCHAR(50) NOT NULL UNIQUE,
    SENHA TEXT NOT NULL,
    EMAIL VARCHAR(256) NOT NULL UNIQUE,
    TIPO ENUM('NORMAL', 'ADMIN', 'ESPECIALISTA') DEFAULT 'NORMAL',
    PRIMARY KEY (`USUARIO_ID`)
);


-- criar tabela denunciaUsuario

CREATE TABLE DENUNCIA_USUARIO (
    DENUNCIA_ID INT AUTO_INCREMENT,
    USUARIO_DENUNCIANTE_ID INT NOT NULL,
    USUARIO_DENUNCIADO_ID INT NOT NULL,
    DATA_DENUNCIA DATE NOT NULL,
    STATUS_DENUNCIA ENUM('EM_ESPERA', 'APROVADO', 'REPROVADO') DEFAULT "EM_ESPERA",
    CONTEUDO TEXT NOT NULL,
    PRIMARY KEY (`DENUNCIA_ID`),
    FOREIGN KEY (`USUARIO_DENUNCIANTE_ID`) REFERENCES `USUARIO` (`USUARIO_ID`),
    FOREIGN KEY (`USUARIO_DENUNCIADO_ID`) REFERENCES `USUARIO` (`USUARIO_ID`)
);

-- criar tabela notícia
CREATE TABLE NOTICIA (
    NOTICIA_ID INT AUTO_INCREMENT,
    USUARIO_ID INT NOT NULL,
    TITULO TEXT NOT NULL,
    IMAGEM TEXT,
    DESCRICAO TEXT,
    AVALIACAO_POSITIVA INT DEFAULT 0,
    AVALIACAO_NEGATIVA INT DEFAULT 0,
    PRIMARY KEY (`NOTICIA_ID`),
    FOREIGN KEY (`USUARIO_ID`) REFERENCES `USUARIO` (`USUARIO_ID`)
);

-- criar tabela denunciaNoticia
CREATE TABLE DENUNCIA_NOTICIA (
    DENUNCIA_ID INT AUTO_INCREMENT,
    USUARIO_ID INT NOT NULL,
    NOTICIA_ID INT NOT NULL,
    DATA_DENUNCIA DATE NOT NULL,
    STATUS_DENUNCIA ENUM('EM_ESPERA', 'APROVADO', 'REPROVADO') DEFAULT "EM_ESPERA",
    CONTEUDO TEXT NOT NULL,
    PRIMARY KEY (`DENUNCIA_ID`),
    FOREIGN KEY (`USUARIO_ID`) REFERENCES `USUARIO` (`USUARIO_ID`),
    FOREIGN KEY (`NOTICIA_ID`) REFERENCES `NOTICIA` (`NOTICIA_ID`)
);


-- criar tabela comentário
CREATE TABLE COMENTARIO (
    COMENTARIO_ID INT AUTO_INCREMENT,
    NOTICIA_ID INT NOT NULL,
    USUARIO_ID INT NOT NULL,
    COMENTARIO_PAI_ID INT,
    DATA_COMENTARIO DATETIME NOT NULL,
    CONTEUDO TEXT NOT NULL,
    PRIMARY KEY (`COMENTARIO_ID`),
    FOREIGN KEY (`USUARIO_ID`) REFERENCES `USUARIO` (`USUARIO_ID`),
    FOREIGN KEY (`NOTICIA_ID`) REFERENCES `NOTICIA` (`NOTICIA_ID`),
    FOREIGN KEY (`COMENTARIO_PAI_ID`) REFERENCES `COMENTARIO` (`COMENTARIO_ID`)
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