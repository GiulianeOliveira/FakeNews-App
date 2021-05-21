import React from 'react'
import Register from '../Register'

const Profile = () => {
  const dadosTeste = {
    nome: 'Giuliane',
    sobrenome: 'Oliveira',
    email: 'giuliane.oliveira@hotmail.com',
    login: 'Giuliane',
    senha: '12345',
    id: '9999'
  }
  // fazer uma request get User
  console.log('teste')
  return <Register dados={dadosTeste} />
}

export default Profile

// testRoute={history.location.pathname.includes('/negocios/editar-perfil')}
