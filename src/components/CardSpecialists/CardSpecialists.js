import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import axios from 'axios'
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
    textDecorationLine: 'none',
    color: 'black',
    fontFamily: 'Roboto, Helvetica'
  },
  text: {
    fontSize: '18px'
  },
  content: {
    justifyContent: 'center',
    marginTop: '4px',
    marginBottom: '4px'
  },
  button: {
    height: '50px',
    width: '100px'
  }
})

const CardSpecialists = ({ dados, setValid }) => {
  const classes = useStyles()

  const onSubmit = async aprove => {
    await axios
      .put('http://localhost:3333/promote', {
        login: dados.login,
        status: aprove
      })
      .then(() => {
        setValid(true)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Row alignItems='baseline'>
          <Column mr='5px'>
            <Typography className={classes.title}>Nome de usuário:</Typography>
          </Column>
          <Typography className={classes.text}>{dados.login}</Typography>
        </Row>
        <Row alignItems='baseline'>
          <Column mr='5px' mt='5px'>
            <Typography className={classes.title}>Formação/Profissão:</Typography>
          </Column>
          <Typography className={classes.text}>
            <a rel='noreferrer' target='_blank' href={`${dados.certificado}`}>
              {dados.formacao}
            </a>
          </Typography>
        </Row>
        <Row alignItems='baseline'>
          <Column mr='5px' mt='5px'>
            <Typography className={classes.title}>Justificativa:</Typography>
          </Column>
          <Typography className={classes.text}>{dados.descricao}</Typography>
        </Row>
      </CardContent>
      <Row className={classes.content}>
        <Typography className={classes.title}>Aprovar especialista?</Typography>
      </Row>
      <CardActions className={classes.content}>
        <Button
          className={classes.button}
          type='submit'
          variant='contained'
          color='primary'
          onClick={() => onSubmit(true)}
        >
          Sim
        </Button>
        <Button
          className={classes.button}
          type='submit'
          variant='contained'
          color='primary'
          onClick={() => onSubmit(false)}
        >
          Não
        </Button>
      </CardActions>
    </Card>
  )
}

export default CardSpecialists
