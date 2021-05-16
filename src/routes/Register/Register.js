import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { TextField, Typography, Button, Checkbox, FormControlLabel } from '@material-ui/core'
import axios from 'axios'
import Wrapper from '../../components/Wrapper'
import Row from '../../components/Row'
import Navbar from '../../components/Navbar'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const history = useHistory()
  const { register, handleSubmit, setValue } = useForm()

  const onSubmit = async data => {
    const completeName = `${data.firstName} ${data.lastName}`
    console.log(data, completeName)

    await axios
      .post('http://2b2326f7730e.ngrok.io/user', {
        nome: completeName,
        login: data.userName,
        senha: data.userPassword,
        email: data.email
      })
      .then(res => {
        if (res.status === 200) {
          history.push('/login')
        }
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <div>
      <Navbar />
      <Wrapper
        mt='10%'
        hasIconBack
        path='/sair'
        width='25%'
        {...{ maxWidth: 792 }}
        margin='auto'
        as='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant='h3' align='center'>
          Cadastro
        </Typography>
        <Row mt='30px' justifyContent='space-between'>
          <TextField
            variant='outlined'
            margin='normal'
            required
            label='Nome'
            name='firstName'
            placeholder='Nome'
            width='280px'
            height='40px'
            {...register('firstName')}
            onChange={e => setValue('firstName', e.target.value)}
          />
          <TextField
            {...register('lastName')}
            onChange={e => setValue('lastName', e.target.value)}
            variant='outlined'
            margin='normal'
            required
            label='Sobrenome'
            name='lastName'
            autoFocus
            placeholder='Sobrenome'
            width='280px'
            height='40px'
          />
        </Row>
        <Row mt='25px'>
          <TextField
            {...register('email')}
            onChange={e => setValue('email', e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='E-mail'
            name='email'
            autoFocus
            placeholder='Email'
            width='280px'
            height='40px'
          />
        </Row>
        <Row mt='25px' justifyContent='space-between'>
          <TextField
            {...register('userName')}
            onChange={e => setValue('userName', e.target.value)}
            variant='outlined'
            margin='normal'
            required
            label='Nome de usuário'
            name='userName'
            autoFocus
            placeholder='Nome de usuário'
            width='280px'
            height='40px'
          />
          <TextField
            {...register('userPassword')}
            onChange={e => setValue('userPassword', e.target.value)}
            variant='outlined'
            type={showPassword ? 'text' : 'password'}
            margin='normal'
            required
            label='Senha'
            name='userPassword'
            autoFocus
            placeholder='Senha'
            width='280px'
            height='40px'
          />
        </Row>
        <Row flexDirection='row-reverse'>
          <FormControlLabel
            label='Mostrar senha'
            control={<Checkbox value='remember' color='primary' onClick={() => setShowPassword(!showPassword)} />}
          />
        </Row>
        <Row flexDirection='row-reverse' mt='20px'>
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Cadastrar
          </Button>
        </Row>
      </Wrapper>
    </div>
  )
}

export default Register
