import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
// import { Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import CardNotice from '../../components/CardNotice'
import Column from '../../components/Column'
import Navbar from '../../components/Navbar'

/* Fazer o feed utilizar useEffect para atualizar sempre que houver notícias novas */
// dados mockados

const Home = () => {
  const history = useHistory()
  const [notices, setNotices] = useState([])

  setTimeout(() => {
    console.log('RELOAD')
    window.location.reload(1)
  }, 180000)

  const getNotice = async () => {
    await axios
      .get('http://42bde8b9e312.ngrok.io/visualizarnoticia')
      // eslint-disable-next-line consistent-return
      .then(res => {
        if (res.status === 200) {
          return setNotices(res.data.reverse())
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
      <Column width='40%' {...{ maxWidth: 980 }} margin='auto' as='form'>
        <Typography variant='h4' align='center'>
          Feed de notícias
        </Typography>
        {notices.map(noticia => (
          <CardNotice
            key={noticia.noticia_id}
            click={() => history.push(`/visualizar-noticia:${noticia.noticia_id}`)}
            title={noticia.titulo}
            description={noticia.descricao}
            image={noticia.imagem}
            positiva={noticia.avaliacaoP}
            negativa={noticia.avaliacaoN}
          />
        ))}
      </Column>
    </>
  )
}

export default Home
