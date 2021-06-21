/* eslint-disable no-unused-expressions */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Row from '../Row'
import Column from '../Column'

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    maxWidth: '100%',
    margin: 'auto',
    marginTop: '25px',
    padding: '15px'
  },
  title: {
    fontSize: '18px',
    fontWeight: '600'
  },
  pos: {
    marginBottom: 12
  },
  link: {
    fontSize: '18px',
    color: 'black',
    fontFamily: 'Roboto, Helvetica',
    textDecorationLine: 'underline',
    border: 'none!important',
    backgroundColor: 'white!important',
    cursor: 'pointer',
    width: '400px'
  },
  text: {
    fontSize: '18px'
  },
  content: {
    justifyContent: 'center',
    marginTop: '4px',
    marginBottom: '4px'
  }
})

const ReportNotice = ({ dados, isUser, setIsDeletedReportedNotice, setIsDeletedReportedUser }) => {
  const classes = useStyles()
  const history = useHistory()

  const onSubmitUser = async aprove => {
    if (aprove) {
      await axios
        .delete(`http://localhost:3333/delete/${dados.login_denunciado}`)
        .then(() => {
          setIsDeletedReportedUser(true)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      await axios
        .put('http://localhost:3333/avaliarUsuarioDenuncia', {
          login_denunciante: dados.login_denunciante,
          login_denunciado: dados.login_denunciado,
          status: aprove
        })
        .then(() => {
          setIsDeletedReportedUser(true)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const onSubmitNotice = async aprove => {
    if (aprove) {
      await axios
        .delete(`http://localhost:3333/delete?noticia_id=${dados.noticia_id}`)
        .then(() => {
          setIsDeletedReportedNotice(true)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      await axios
        .put('http://localhost:3333/denuncia/avaliar', {
          login: dados.login,
          noticia_id: dados.noticia_id,
          status: aprove
        })
        .then(() => {
          setIsDeletedReportedNotice(true)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Row alignItems='baseline'>
          <Column mr='5px'>
            <Typography className={classes.title}>{isUser ? 'Usuário reportado:' : 'Notícia:'}</Typography>
          </Column>
          <Typography className={classes.text}>
            {isUser && dados?.login_denunciado}
            {!isUser && (
              <button
                type='button'
                className={classes.link}
                onClick={() => history.push(`/visualizar-noticia:${dados?.noticia_id}`)}
              >
                {dados?.titulo}
              </button>
            )}
          </Typography>
        </Row>
        <Row alignItems='baseline'>
          <Column mr='5px' mt='5px'>
            <Typography className={classes.title}>Motivo da denúncia:</Typography>
            <Typography className={classes.text}>{dados?.conteudo}</Typography>
          </Column>
        </Row>
        <Row alignItems='baseline'>
          <Column mr='5px' mt='5px'>
            <Typography className={classes.title}>Denunciante:</Typography>
          </Column>
          <Typography className={classes.text}>{isUser ? dados?.login_denunciante : dados?.login}</Typography>
        </Row>
      </CardContent>
      <Row className={classes.content}>
        <Typography className={classes.text}>Deletar {isUser ? 'usuário' : 'notícia'}?</Typography>
      </Row>
      <CardActions className={classes.content}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          onClick={() => {
            isUser ? onSubmitUser(true) : onSubmitNotice(true)
          }}
        >
          Deletar
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          onClick={() => {
            isUser ? onSubmitUser(false) : onSubmitNotice(false)
          }}
        >
          Ignorar
        </Button>
      </CardActions>
    </Card>
  )
}

export default ReportNotice
