import React from 'react'
import { Typography } from '@material-ui/core'
import Navbar from '../../components/Navbar'
import Column from '../../components/Column'
import ReportNotice from '../../components/ReportNotice'

const dadosMocks = [
  {
    noticia: 'Cadastre-se para ganhar dinheiro',
    link: 'https://www.google.com.br',
    motivo: 'Spam',
    id: '1',
    data: '22/05',
    denunciante: 'Paula'
  },
  {
    noticia: 'Todos serão mortos',
    link: 'https://www.google.com.br',
    motivo: 'Conteúdo Noscivo',
    id: '2',
    data: '12/06',
    denunciante: 'Leandro'
  }
]

// Fazer useEffect e sempre que deletar uma notícia da refresh na página

const Admin = () => {
  console.log('teste')

  return (
    <>
      <Navbar />
      <Typography variant='h5' component='h2' align='center'>
        Notícias denunciadas
      </Typography>
      {dadosMocks.map(dado => (
        <Column maxWidth='50%' margin='50px auto'>
          <ReportNotice key={dado.id} dados={dado} />
        </Column>
      ))}
    </>
  )
}

export default Admin
// Usuario, profissao, categoria, motivo pq especialista e doc comprovante
