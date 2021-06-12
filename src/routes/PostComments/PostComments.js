import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'
import axios from 'axios'
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

// GET DE NOTÍCIA PRONTA - FALTA GET DE COMENTÁRIOS
const PostComments = () => {
  const [notice, setNotice] = useState({})
  let { id } = useParams()
  id = id.replace(':', '')

  const getNotice = async () => {
    await axios
      .get(`http://42bde8b9e312.ngrok.io/visualizarnoticia/${id}`)
      // eslint-disable-next-line consistent-return
      .then(res => {
        if (res.status === 200) {
          return setNotice(res.data)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getNotice()
  }, [])

  return (
    <>
      <Navbar />
      <Column {...{ maxWidth: 980 }} margin='auto'>
        <Card backgroundColor='white' marginBottom='15px'>
          <Row>
            <Typography variant='h4'>
              <b>{notice.titulo}</b>
            </Typography>
          </Row>
          <Row mt='20px' mb='14px'>
            <Typography>{notice.descricao}</Typography>
          </Row>
          <Column width='600px'>
            <Row>
              <Logo src={`${notice.imagem}`} height='350px' width='600px' />
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
