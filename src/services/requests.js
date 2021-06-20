import axios from 'axios'

const route = 'http://6f718f25d277.ngrok.io'

export const login = data => axios.post(`${route}/signin`, { login: data.userName, senha: data.password })

export const postNotice = data =>
  axios.post(`${route}/crianoticia`, {
    login: 'Teste12',
    titulo: data.notice_title,
    imagem: data.img,
    descricao: data.description
  })

export const getNotices = () => axios.get(`${route}/visualizarnoticia`)

export const viewNotice = id => axios.get(`${route}/visualizarnoticia/${id}`)

export const newUser = (completeName, data) =>
  axios.post(`${route}/user`, {
    nome: completeName,
    login: data.userName,
    senha: data.userPassword,
    email: data.email
  })

// export const EditUser = (completeName, data) =>
//   axios.put(`${route}/user`, {
//     nome: completeName,
//     login: data.userName ? data.userName : dados.login,
//     senha: data.userPassword ? data.userPassword : dados.senha,
//     email: data.email ? data.email : dados.email
//   })

// `${route}/`
