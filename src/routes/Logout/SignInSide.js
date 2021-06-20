import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core/'
import axios from 'axios'
// import { login } from '../../services/requests'
import { AuthContext } from '../../AuthProvider'
import { Logo } from '../../theme/styles'
import FakeNewsLogo from '../../assets/images/FakeNewsLogo.png'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://github.com/GiulianeOliveira/FakeNews-App'>
        Desenvolvimento de Softwares UFPel
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
  const [, setUser] = useContext(AuthContext)
  const { register, handleSubmit, setValue } = useForm()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async data => {
    // await login(data)
    // setUser(data)
    // history.push('/home')
    await axios
      .post('http://e060003e3f5e.ngrok.io/signin', { login: data.userName, senha: data.password })
      .then(res => {
        setUser(res.data)
        history.push('/home')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Logo src={FakeNewsLogo} height='150px' />

          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Nome de usuário'
              name='userName'
              autoFocus
              {...register('userName')}
              onChange={e => setValue('userName', e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Senha'
              type={showPassword ? 'text' : 'password'}
              id='password'
              autoComplete='current-password'
              {...register('password')}
              onChange={e => setValue('password', e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' onClick={() => setShowPassword(!showPassword)} />}
              label='Mostrar senha'
            />
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
