-- usar o banco criado

USE FAKENEWSAPP;

-- Inserir adiministradores
INSERT INTO USUARIO (login, nome, sobrenome, senha, email, tipo, especialista) VALUES
('andressa.werner', 'Andressa','Werner', '123', 'awkpereira@inf.ufpel.edu.br', 'admin', 0),
('giu.oliveira', 'Giuliane','Oliveira', '123', 'giuzinha@inf.ufpel.edu.br', 'admin', 0),
('gianlucca', 'Gianlucca','Buzo', '123', 'gianlucca@inf.ufpel.edu.br', 'admin', 0),
('joao', 'João','Barth', '123', 'joao@inf.ufpel.edu.br', 'admin', 0),
('vitor.pinho', 'Vitor','Pinho', '123', 'vwpinho@inf.ufpel.edu.br', 'admin', 0),
('igor.rosler', 'Igor','Rosler', '123', 'idsrosler@inf.ufpel.edu.br', 'admin', 0);

-- Inserir usuários normais
INSERT INTO USUARIO (login, nome, sobrenome, senha, email, tipo, especialista) VALUES
('user1', 'Usuário 1', 'Teste', '123', 'user1@inf.ufpel.edu.br', 'normal', 1),
('user2', 'Usuário 2', 'Teste', '123', 'user2@inf.ufpel.edu.br', 'normal', 1),
('user3', 'Usuário 3', 'Teste', '123', 'user3@inf.ufpel.edu.br', 'normal', 1),
('user4', 'Usuário 4', 'Teste', '123', 'user4@inf.ufpel.edu.br', 'normal', 1),
('user5', 'Usuário 5', 'Teste', '123', 'user5@inf.ufpel.edu.br', 'normal', 0),
('user6', 'Usuário 6', 'Teste', '123', 'user6@inf.ufpel.edu.br', 'normal', 0),
('user7', 'Usuário 7', 'Teste', '123', 'user7@inf.ufpel.edu.br', 'normal', 0),
('user8', 'Usuário 8', 'Teste', '123', 'user8@inf.ufpel.edu.br', 'normal', 0);

-- Inserir noticias
INSERT INTO NOTICIA (login, titulo, imagem, descricao) VALUES
('user1', 'CPI da Covid: Em meio a colapso por falta de oxigênio, Manaus fez apelo por azitromicina e ivermectina ao Ministério da Saúde', 
'https://i.em.com.br/dtNcIXY7uiUjBnkhpOKttzN9s8Q=/820x0/smart/imgsapp.em.com.br/app/noticia_127983242361/2021/06/15/1276788/20210615070207424950o.png', 
'Nos primeiros dias do ano, quando o Amazonas vivia o colapso do seu sistema de saúde e a iminente falta de oxigênio devido à explosão de casos de covid-19, a prefeitura de Manaus e o governo estadual solicitaram ao Ministério da Saúde envio de medicamentos ineficazes para tratamento da doença, como cloroquina, azitromicina e ivermectina. É o que mostram documentos requisitados pela Comissão Parlamentar de Inquérito (CPI) da Covid às secretarias municipal e estadual de saúde e analisados pela BBC News Brasil. Os pedidos por medicamentos ineficazes ocorreram entre 5 e 14 de janeiro. Segundo a série histórica da Fundação de Vigilância em Saúde do Amazonas, 14 de janeiro, dia em que o oxigênio acabou em Manaus, foi o mais letal da covid-19 no Estado, com 176 óbitos registrados.'),
('user1', 'Randolfe Rodrigues invade transmissão de Carlos Wizard e lembra convocação na CPI',
'https://jpimg.com.br/uploads/2020/06/carlos-wizard.jpg', 
'O vice-presidente da CPI da Covid-19, senador Randolfe Rodrigues, apareceu de surpresa em uma transmissão ao vivo do empresário Carlos Wizard e o lembrou de sua convocação ao colegiado. Durante a transmissão, realizada no Youtube nesta segunda-feira, 14, o senador lembrou que a oitiva de Wizard está marcada para esta quinta-feira, 17.  “Vim lembrar você de seu compromisso na próxima quinta-feira (17), na CPI da Covid. Para facilitar: a CPI está sendo realizada no Senado, no Anexo II, Ala Sen. Alexandre Costa, Plenário 3”, disse Randolfe no chat da transmissão. Até o momento, a comunicação do empresário não respondeu às solicitações do colegiado. Os advogados de Wizard pediram para que o depoimento fosse feito por videoconferência, uma vez que o empresário está nos Estados Unidos. Mas o presidente Omar Aziz (PSD-AM) irá negar o pedido.'),
('user2', 'Auxílio Emergencial 2021: governo antecipa pagamento da 3ª parcela; veja novo calendário',
'https://s2.glbimg.com/zpQoTxMeOTv1kWHl7VSHfWuwXYs=/0x0:713x476/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/A/l/J9un3QRmGZjIBNtRyKGw/captura-de-tela-2021-06-15-as-08.12.34.png', 
'O governo federal decidiu antecipar os pagamentos da terceira parcela do Auxílio Emergencial 2021 para o público inscrito via canais digitais e do Cadastro Único. O novo calendário foi publicado nesta terça-feira (15) no Diário Oficial da União.'),
('user2', 'DF: Suspeito de matar família e praticar roubos se diz possuído por “demônio”',
'https://cdn-istoe-ssl.akamaized.net/wp-content/uploads/sites/14/2021/06/lazaro-418x235.jpg', 
'Uma força-tarefa da Polícia Civil de Goiás e do Distrito Federal está procurando Lázaro Barbosa de Sousa, de 32 anos. O homem é suspeito de matar quatro pessoas da mesma família e atirar em outras quatro durante roubos recentes na região do Entorno do Distrito Federal. AS informações são do G1 e do Uol. Cerca de 200 policiais realizam buscas em rios e matas de Cocalzinho de Goiás, onde o suspeito estaria escondido. De acordo com os agentes, o criminoso conhece bem a região e, por ser caçador, ele se esconde com facilidade e até dorme em cima de árvores. Ainda conforme as investigações, o homem se diz perseguido por uma espécie de “demônio” ou “espírito”. Segundo a polícia, há indícios de que Lázaro participe de rituais satânicos.'),
('user3', 'MG divulga calendário de vacinação da Covid por faixa etária: veja cronograma',
'https://www.otempo.com.br/image/contentid/policy:1.2497347:1623363440/a3f0bb7c-49b2-49fb-8c8b-7ca1d075620a.jpg?f=3x2&q=0.6&w=1200&$p$f$q$w=3e4901c', 
'O secretário de Estado de Saúde de Minas Gerais, Fábio Baccheretti, divulgou o calendário de vacinação da Covid por faixa etária na manhã desta terça-feira (15), durante coletiva de imprensa'),
('user4', 'CPI da Covid: Em meio a colapso por falta de oxigênio, Manaus fez apelo por azitromicina e ivermectina ao Ministério da Saúde', 
'https://i.em.com.br/dtNcIXY7uiUjBnkhpOKttzN9s8Q=/820x0/smart/imgsapp.em.com.br/app/noticia_127983242361/2021/06/15/1276788/20210615070207424950o.png', 
'Nos primeiros dias do ano, quando o Amazonas vivia o colapso do seu sistema de saúde e a iminente falta de oxigênio devido à explosão de casos de covid-19, a prefeitura de Manaus e o governo estadual solicitaram ao Ministério da Saúde envio de medicamentos ineficazes para tratamento da doença, como cloroquina, azitromicina e ivermectina. É o que mostram documentos requisitados pela Comissão Parlamentar de Inquérito (CPI) da Covid às secretarias municipal e estadual de saúde e analisados pela BBC News Brasil. Os pedidos por medicamentos ineficazes ocorreram entre 5 e 14 de janeiro. Segundo a série histórica da Fundação de Vigilância em Saúde do Amazonas, 14 de janeiro, dia em que o oxigênio acabou em Manaus, foi o mais letal da covid-19 no Estado, com 176 óbitos registrados.'),
('user5', 'Randolfe Rodrigues invade transmissão de Carlos Wizard e lembra convocação na CPI',
'https://jpimg.com.br/uploads/2020/06/carlos-wizard.jpg', 
'O vice-presidente da CPI da Covid-19, senador Randolfe Rodrigues, apareceu de surpresa em uma transmissão ao vivo do empresário Carlos Wizard e o lembrou de sua convocação ao colegiado. Durante a transmissão, realizada no Youtube nesta segunda-feira, 14, o senador lembrou que a oitiva de Wizard está marcada para esta quinta-feira, 17.  “Vim lembrar você de seu compromisso na próxima quinta-feira (17), na CPI da Covid. Para facilitar: a CPI está sendo realizada no Senado, no Anexo II, Ala Sen. Alexandre Costa, Plenário 3”, disse Randolfe no chat da transmissão. Até o momento, a comunicação do empresário não respondeu às solicitações do colegiado. Os advogados de Wizard pediram para que o depoimento fosse feito por videoconferência, uma vez que o empresário está nos Estados Unidos. Mas o presidente Omar Aziz (PSD-AM) irá negar o pedido.'),
('user6', 'Auxílio Emergencial 2021: governo antecipa pagamento da 3ª parcela; veja novo calendário',
'https://s2.glbimg.com/zpQoTxMeOTv1kWHl7VSHfWuwXYs=/0x0:713x476/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/A/l/J9un3QRmGZjIBNtRyKGw/captura-de-tela-2021-06-15-as-08.12.34.png', 
'O governo federal decidiu antecipar os pagamentos da terceira parcela do Auxílio Emergencial 2021 para o público inscrito via canais digitais e do Cadastro Único. O novo calendário foi publicado nesta terça-feira (15) no Diário Oficial da União.'),
('user7', 'DF: Suspeito de matar família e praticar roubos se diz possuído por “demônio”',
'https://cdn-istoe-ssl.akamaized.net/wp-content/uploads/sites/14/2021/06/lazaro-418x235.jpg', 
'Uma força-tarefa da Polícia Civil de Goiás e do Distrito Federal está procurando Lázaro Barbosa de Sousa, de 32 anos. O homem é suspeito de matar quatro pessoas da mesma família e atirar em outras quatro durante roubos recentes na região do Entorno do Distrito Federal. AS informações são do G1 e do Uol. Cerca de 200 policiais realizam buscas em rios e matas de Cocalzinho de Goiás, onde o suspeito estaria escondido. De acordo com os agentes, o criminoso conhece bem a região e, por ser caçador, ele se esconde com facilidade e até dorme em cima de árvores. Ainda conforme as investigações, o homem se diz perseguido por uma espécie de “demônio” ou “espírito”. Segundo a polícia, há indícios de que Lázaro participe de rituais satânicos.'),
('user8', 'MG divulga calendário de vacinação da Covid por faixa etária: veja cronograma',
'https://www.otempo.com.br/image/contentid/policy:1.2497347:1623363440/a3f0bb7c-49b2-49fb-8c8b-7ca1d075620a.jpg?f=3x2&q=0.6&w=1200&$p$f$q$w=3e4901c', 
'O secretário de Estado de Saúde de Minas Gerais, Fábio Baccheretti, divulgou o calendário de vacinação da Covid por faixa etária na manhã desta terça-feira (15), durante coletiva de imprensa');

-- Inserir comentários
INSERT INTO COMENTARIO (sequencia, noticia_id, login, data, conteudo) VALUES
(1, 1, 'user1', '2021-06-15 23:59:59', 'Conteúdo para o comentário da notícia'),
(2, 1, 'user1', '2021-06-14 23:59:59', 'Conteúdo para o comentário da notícia'),
(3, 1, 'user2', '2021-06-14 23:59:59', 'Conteúdo para o comentário da notícia'),
(4, 1, 'user3', '2021-06-15 23:59:59', 'Conteúdo para o comentário da notícia'),
(1, 2, 'user2', '2021-06-13 23:59:59', 'Conteúdo para o comentário da notícia'),
(2, 2, 'user4', '2021-06-13 23:59:59', 'Conteúdo para o comentário da notícia'),
(1, 3, 'user4', '2021-06-15 23:59:59', 'Conteúdo para o comentário da notícia'),
(2, 3, 'user5', '2021-06-12 23:59:59', 'Conteúdo para o comentário da notícia'),
(3, 3, 'user2', '2021-06-11 23:59:59', 'Conteúdo para o comentário da notícia'),
(1, 4, 'user1', '2021-06-15 23:59:59', 'Conteúdo para o comentário da notícia'),
(1, 5, 'user4', '2021-06-15 23:59:59', 'Conteúdo para o comentário da notícia'),
(1, 6, 'user7', '2021-06-14 23:59:59', 'Conteúdo para o comentário da notícia'),
(1, 7, 'user8', '2021-06-15 23:59:59', 'Conteúdo para o comentário da notícia'),
(1, 8, 'user3', '2021-06-10 23:59:59', 'Conteúdo para o comentário da notícia');

-- Inserir denuncia usuário
INSERT INTO DENUNCIA_USUARIO (login_denunciante, login_denunciado, data, status, conteudo) VALUES
('user1','user2', '2021-06-15', 'em_espera', 'Conteúdo da denúncia do usuário'),
('user1','user3', '2021-06-15', 'em_espera', 'Conteúdo da denúncia do usuário'),
('user2','user1', '2021-06-15', 'em_espera', 'Conteúdo da denúncia do usuário'),
('user3','user4', '2021-06-15', 'em_espera' , 'Conteúdo da denúncia do usuário'),
('user2','user8', '2021-06-15', 'em_espera', 'Conteúdo da denúncia do usuário');

-- Inserir denuncia notícia
INSERT INTO DENUNCIA_NOTICIA (login, noticia_id, data_denuncia, status_denuncia, conteudo) VALUES
('user1',2 , '2021-06-15', 'em_espera', 'Conteúdo da denúncia da notícia'),
('user1',3 , '2021-06-15', 'em_espera', 'Conteúdo da denúncia da notícia'),
('user2',1 , '2021-06-15', 'em_espera', 'Conteúdo da denúncia da notícia'),
('user3',7 , '2021-06-15', 'em_espera' , 'Conteúdo da denúncia da notícia'),
('user2',5 , '2021-06-15', 'em_espera', 'Conteúdo da denúncia da notícia');

-- Inserir avaliação especialista
INSERT INTO AVALIA_ESPECIALISTA_NOTICIA (login, noticia_id, avaliacao) VALUES
('user1',2 , 'fake'),
('user1',1 , 'fato'),
('user2',1 , 'fato'),
('user3',7 , 'fake'),
('user1',3 , 'fake'),
('user4',1 , 'fato'),
('user2',2 , 'fake'),
('user3',1 , 'fake'),
('user3',5 , 'fato'),
('user4',5 , 'fake');

-- Inserir arequisição especialista
INSERT INTO REQUISICAO_ESPECIALISTA (login, formacao, descricao, certificado, status) VALUES
('user1', 'artes', "Descrição da requisição", 'https://drive.google.com/file/d/1G8M8nDmFkt2Gs30_uYpINmJmou-Fm6qB/view', 'aprovado'),
('user2', 'artes', "Descrição da requisição", 'https://drive.google.com/file/d/1G8M8nDmFkt2Gs30_uYpINmJmou-Fm6qB/view',  'aprovado'),
('user3', 'artes', "Descrição da requisição", 'https://drive.google.com/file/d/1G8M8nDmFkt2Gs30_uYpINmJmou-Fm6qB/view', 'aprovado'),
('user4', 'artes', "Descrição da requisição", 'https://drive.google.com/file/d/1G8M8nDmFkt2Gs30_uYpINmJmou-Fm6qB/view', 'aprovado'),
('user5', 'artes', "Descrição da requisição", 'https://drive.google.com/file/d/1G8M8nDmFkt2Gs30_uYpINmJmou-Fm6qB/view', 'em_espera'),
('user6', 'artes', "Descrição da requisição", 'https://drive.google.com/file/d/1G8M8nDmFkt2Gs30_uYpINmJmou-Fm6qB/view', 'em_espera'),
('user7', 'artes', "Descrição da requisição", 'https://drive.google.com/file/d/1G8M8nDmFkt2Gs30_uYpINmJmou-Fm6qB/view', 'em_espera'),
('user8', 'artes', "Descrição da requisição", 'https://drive.google.com/file/d/1G8M8nDmFkt2Gs30_uYpINmJmou-Fm6qB/view', 'reprovado');
