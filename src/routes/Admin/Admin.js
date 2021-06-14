import React from 'react'
import { Typography } from '@material-ui/core'
import Navbar from '../../components/Navbar'
import Column from '../../components/Column'
import Row from '../../components/Row'
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
  },
  {
    noticia: 'Todos serão mortos',
    link: 'https://www.google.com.br',
    motivo: 'Conteúdo Noscivo',
    id: '2',
    data: '12/06',
    denunciante: 'Leandro'
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
      <Row {...{ maxWidth: 980 }} m='80px auto 130px'>
        <Column mr='200px'>
          <Row mb='20px' justifyContent='center'>
            <Typography variant='h4' component='h2'>
              Notícias denunciadas
            </Typography>
          </Row>
          {dadosMocks.map(dado => (
            <Column maxWidth='100%'>
              <ReportNotice key={dado.id} dados={dado} />
            </Column>
          ))}
        </Column>
        <Column>
          <Row mb='20px' justifyContent='center'>
            <Typography variant='h4' component='h2'>
              Usuários denunciados
            </Typography>
          </Row>
          {dadosMocks.map(dado => (
            <Column maxWidth='100%'>
              <ReportNotice key={dado.id} dados={dado} />
            </Column>
          ))}
        </Column>
      </Row>
    </>
  )
}

export default Admin
// Usuario, profissao, categoria, motivo pq especialista e doc comprovante
