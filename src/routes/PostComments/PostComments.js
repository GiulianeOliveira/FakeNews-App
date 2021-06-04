import React from 'react'
import { Button, Typography } from '@material-ui/core'
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import WarningIcon from '@material-ui/icons/Warning'
// import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Navbar from '../../components/Navbar'
import Column from '../../components/Column'
import Row from '../../components/Row'
import NewsReview from '../../components/NewsReview'
import Card from '../../components/Card'
import Comments from '../../components/Comments'
import { Logo } from '../../theme/styles'
import NoticiaMockada from '../../assets/images/NoticiaMockada.jpg'

const noticiaMock = {
  titulo: 'Hebraica tem excesso de vacinas contra a Covid-19 e doses estão prestes a vencer',
  descricao:
    'O clube Hebraica, na Zona Sul de São Paulo, tem uma sobra de vacinas contra a Covid-19, que podem ser descartadas ou perdidas caso não sejam usadas a tempo.',
  imagem: NoticiaMockada,
  id: 1,
  tipo: 'coronavirus',
  avaliacoes: { positivas: 2, negativas: 1 },
  comentarios: [
    'Não acredito que algo como isto seja verdade!',
    'Espero que algum especialista possa nos confirmar a informação.'
  ]
}

// fazer um get pro back-end e buscar a notícia pelo id, o id vem pelo pathname da rota!
// buscar comentarios com request

// const addressDefaults = {
//   cep: '',
//   city: '',
//   state: '',
//   neighbourhood: '',
//   street: '',
//   house_number: ''
// }

const PostComments = () => {
  console.log('teste')
  return (
    <>
      <Navbar />
      <Column {...{ maxWidth: 980 }} margin='auto'>
        <Card backgroundColor='white' marginBottom='15px'>
          <Row>
            <Typography variant='h4'>
              <b>{noticiaMock.titulo}</b>
            </Typography>
          </Row>
          <Row mt='20px' mb='14px'>
            <Typography>{noticiaMock.descricao}</Typography>
          </Row>
          <Column width='600px'>
            <Row>
              <Logo src={`${noticiaMock.imagem}`} height='350px' width='600px' />
            </Row>
            <Row justifyContent='space-between' flexDirection='row-reverse' mt='8px' mb='8px'>
              <Row alignItems='center'>
                <WarningIcon />
                <Button onClick={() => 'REDIRECIONAR PARA DENÚNCIA'}>Denunciar notícia</Button>
              </Row>
            </Row>
            <NewsReview />
          </Column>
        </Card>

        <Card>
          <Column mb='4px'>
            <Typography>Notícia publicada por:</Typography>
            <Row width='600px' mb='15px' alignItems='center' justifyContent='space-between'>
              <Row>
                <AccountCircleIcon />
                <Typography>Maria do Carmo </Typography>
              </Row>
              <Row alignItems='center'>
                <WarningIcon />
                <Button onClick={() => 'REDIRECIONAR PARA DENÚNCIA'}>Denunciar usuário</Button>
              </Row>
            </Row>
          </Column>

          <Comments />
        </Card>
      </Column>
    </>
  )
}

export default PostComments
