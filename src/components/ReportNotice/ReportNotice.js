import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
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
    fontSize: '20px',
    fontWeight: '600'
  },
  pos: {
    marginBottom: 12
  },
  link: {
    fontSize: '20px',
    textDecorationLine: 'none',
    color: 'black',
    fontFamily: 'Roboto, Helvetica'
  },
  text: {
    fontSize: '20px'
  },
  content: {
    justifyContent: 'center',
    marginTop: '4px',
    marginBottom: '4px'
  }
})

const ReportNotice = ({ dados }) => {
  const classes = useStyles()
  console.log({ dados })

  return (
    <>
      <Card className={classes.root} width='50%'>
        <CardContent>
          <Row alignItems='baseline'>
            <Column mr='5px'>
              <Typography className={classes.title}>Notícia:</Typography>
            </Column>
            <a className={classes.link} href={dados.link}>
              {dados.noticia}
            </a>
          </Row>
          <Row alignItems='baseline'>
            <Column mr='5px' mt='5px'>
              <Typography className={classes.title}>Motivo da denúncia:</Typography>
            </Column>
            <Typography className={classes.text}>{dados.motivo}</Typography>
          </Row>
          <Row alignItems='baseline'>
            <Column mr='5px' mt='5px'>
              <Typography className={classes.title}>Data:</Typography>
            </Column>
            <Typography className={classes.text}>{dados.data}</Typography>
          </Row>
          <Row alignItems='baseline'>
            <Column mr='5px' mt='5px'>
              <Typography className={classes.title}>Denunciante:</Typography>
            </Column>
            <Typography className={classes.text}>{dados.denunciante}</Typography>
          </Row>
        </CardContent>
        <Row className={classes.content}>
          <Typography className={classes.text}>Deletar notícia?</Typography>
        </Row>
        <CardActions className={classes.content}>
          <Button type='submit' variant='contained' color='primary' onClick={() => console.log('DELETADA')}>
            Deletar
          </Button>
          <Button type='submit' variant='contained' color='primary' onClick={() => console.log('IGNORADA')}>
            Ignorar
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export default ReportNotice
