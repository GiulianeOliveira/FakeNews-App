import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { Logo } from '../../theme/styles'
import FakeNewsLogo from '../../assets/images/FakeNewsLogo.png'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://i.vimeocdn.com/video/865465911.webp?mw=1800&mh=949)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignInSide() {
  const classes = useStyles()
  const history = useHistory()
  const [formData, setFormData] = useState({ userName: ' ', password: ' ' })

  const handleSubmit = async event => {
    event.preventDefault()
    // const formattedData = { login: formData.userName, senha: formData.password }
    // booleano que diz se fica na pag de login ou redireciona pra home

    await axios
      .post('http://934043efa417.ngrok.io/signin', { login: formData.userName, senha: formData.password })
      .then(res => {
        if (res.status === 200) {
          history.push('/home')
        }
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleInputUserName = event => {
    setFormData({ ...formData, userName: event.target.value })
  }

  const handleInputPassword = event => {
    setFormData({ ...formData, password: event.target.value })
  }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Logo src={FakeNewsLogo} height='150px' />

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Nome de usuário'
              name='userName'
              autoFocus
              onChange={handleInputUserName}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Senha'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={handleInputPassword}
            />
            <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Mostrar senha' />
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              Entrar
            </Button>
            <Grid container>
              <Grid item>
                <Link href='/cadastro' variant='body2'>
                  Cadastre-se
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
