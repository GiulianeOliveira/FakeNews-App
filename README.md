<!-- PROJECT LOGO -->
<head>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Prata&display=swap" rel="stylesheet">
</head>
<br />
<p align="center">
  <h1 align="center" style="font-size: 50px;  font-family: 'Prata',serif; text-shadow: 5px 5px #000000; color:">Fakenews App</h3>
</p>

# Tabela de Conteúdo

- [Tabela de Conteúdo](#tabela-de-conte%C3%BAdo)
- [Sobre o Projeto](#sobre-o-projeto)
  - [Feito Com](#feito-com)
- [Começando](#come%C3%A7ando)
  - [Pré-requisitos](#pr%C3%A9-requisitos)
  - [Estrutura de Arquivos](#estrutura-de-arquivos)
  - [Instalação](#instala%C3%A7%C3%A3o)

  <!-- ABOUT THE PROJECT -->

# Sobre o Projeto

Este projeto é uma criação de uma aplicação web referente a disciplina de Desenvolvimento de Software do curso de Computação da Universidade Federal de Pelotas.  

## Feito Com

Abaixo segue o que foi utilizado na criação desta aplicação:

### Backend

- [Node.js](https://nodejs.org/en/) - Node.js é JavaScript runtime assíncrono orientado a eventos que foi projetado para construir aplicativos de rede escalonáveis;
- [Npm](https://www.npmjs.com/) - npm é o maior registro de software do mundo. Os desenvolvedores de código aberto de todos os continentes usam o npm para compartilhar e emprestar pacotes;
- [Express](https://www.npmjs.com/package/express) - O Express é um framework para aplicativo da web do Node.js mínimo e flexível que fornece um conjunto robusto de recursos para aplicativos web e móvel;
- [Mysql js](https://www.npmjs.com/package/mysql) - Este é um driver node.js para mysql. Ele é escrito em JavaScript, não requer compilação e é 100% licenciado pelo MIT;
- [Cors](https://www.npmjs.com/package/cors) - CORS é um pacote node.js para fornecer um middleware Connect / Express que pode ser usado para habilitar CORS com várias opções;
- [Bcript.js](https://www.npmjs.com/package/bcryptjs) - Bcript.js é um pacote node.js utilizado para fazer criptografias;

### Front-end

- [React.js](https://pt-br.reactjs.org/) - Uma biblioteca JavaScript para criar interfaces de usuário;
- [Yarn](https://yarnpkg.com/) - O Yarn é um gerenciador de pacotes que trouxe mais funcionalidades e vantagens para programadores. Com uma estrutura já conhecida e utilizada por ferramentas renomadas, como o NPM, essa aplicação tem se destacado por sua simplicidade e segurança;
- [Router dom](https://reactrouter.com/web/guides/quick-start) -  lib completa para controle de rotas que permite que você consiga configurar as rotas utilizando o formato JSX e também disponibiliza uma API para você configurar diretamente via Javascript;
- [Styled Components](https://styled-components.com/) - A biblioteca Styled Components permite que você escreva CSS simples para seus componentes sem se preocupar com colisões dos nomes de classes. Ajuda a escrever CSS com escopo definido para um único componente e não se aplica em nenhum outro elemento da página.;
- [React Hook Form](https://react-hook-form.com/) - A biblioteca traz a proposta de criar formulários flexíveis, com formas simples de fazer validação e sem renderizações desnecessárias.;

<!-- GETTING STARTED -->

# Começando

Para conseguir utilizar a aplicação é preciso seguir as etapas a seguir.

## Pré-requisitos

Antes de seguirmos para as configurações e uso, é ideal que você tenha o ambiente configurado para criar e testar a aplicação web. E para isso você deverá ter instalado:

### Backend

- node.js
- npm

## Estrutura de Arquivos

A estrutura de arquivos está da seguinte maneira:

### Backend

```bash
backend
├── src/
│   ├── config/
│   │   └── db.config.js
│   ├── controllers/
│   │   ├── noticias.js
│   │   └── users.js
│   ├── database/
│   │   └── connection.js
│   │   └── db.sql
│   │   └── delete-db.sql     
│   ├── models/
│   │   └── noticia.js
│   │   └── usuario.js
│   ├── routes/
│   │   └── home.js
│   │   └── noticia.js
│   │   └── user.js
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
├── .gitignore
└── README.md
```

## Instalação

### Backend

No diretório `backend/src/`

1. Instalar as dependências:

```sh
npm install
```

2. Iniciar o servidor em **localhost**:

```sh
npm run server
```

3. Criar banco de dados local:

Necessita a instalação do [Mysql](https://www.mysql.com/) na máquina local 

3.1 Criar banco:

```sh
npm run create-sql
```
3.2 Inicializar banco com configurações default:

```sh
npm run init-sql
```

3.3 Deletar banco:

```sh
npm run delete-sql
```

### Front-end

No diretório `fakenews-app/`

1. Instalar as dependências:

```sh
npm install
```

2. Iniciar o software em **localhost**:

```sh
npm start
```
