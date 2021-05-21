import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { TextField, Typography, Button, Checkbox, FormControlLabel } from '@material-ui/core'
import axios from 'axios'
import Wrapper from '../../components/Wrapper'
import Row from '../../components/Row'
import Navbar from '../../components/Navbar'

const Register = ({ dados }) => {
  // console.log(dados, '<<<<<<<<<<<<<<<<<<<<<<<<<<')
  const [showPassword, setShowPassword] = useState(false)
  const history = useHistory()
  const { register, handleSubmit, setValue } = useForm()

  const onSubmit = async data => {
    if (!dados?.id) {
      const completeName = `${data.firstName} ${data.lastName}`
      // se não houver id de usuário é porque é um novo cadastro
      console.log('NOVO USUÁRIO', data)
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
    } else {
      // editar dados de  usuário já existente
      console.log('EDITAR USUÁRIO', data)
      const completeName = data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : dados.nome
      await axios
        .put('http://2b2326f7730e.ngrok.io/user', {
          nome: completeName,
          login: data.userName ? data.userName : dados.login,
          senha: data.userPassword ? data.userPassword : dados.senha,
          email: data.email ? data.email : dados.email
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
          {dados?.id ? 'Editar perfil' : 'Cadastro'}
        </Typography>
        <Row mt='30px' justifyContent='space-between'>
          <TextField
            variant='outlined'
            margin='normal'
            required
            defaultValue={dados?.nome}
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
            defaultValue={dados?.sobrenome}
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
            defaultValue={dados?.email}
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
            defaultValue={dados?.login}
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
            {dados?.id ? 'Salvar alterações' : 'Cadastrar'}
          </Button>
        </Row>
      </Wrapper>
    </div>
  )
}

export default Register
