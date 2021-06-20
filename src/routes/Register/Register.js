import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { TextField, Typography, Button, Checkbox, FormControlLabel } from '@material-ui/core'
import axios from 'axios'
// import { newUser } from '../../services/requests'
import Wrapper from '../../components/Wrapper'
import Row from '../../components/Row'
import Column from '../../components/Column'
import Navbar from '../../components/Navbar'
import { AuthContext } from '../../AuthProvider'

const Register = ({ dados }) => {
  // console.log(dados, '<<<<<<<<<<<<<<<<<<<<<<<<<<')
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useContext(AuthContext)
  const history = useHistory()
  const { register, handleSubmit, setValue } = useForm()

  const onSubmit = async data => {
    if (!dados) {
      // se não houver id de usuário é porque é um novo cadastro
      console.log('NOVO USUÁRIO', data)
      // await newUser(completeName, data)
      await axios
        .post('http://f1ca5156fd21.ngrok.io/user', {
          nome: data.firstName,
          sobrenome: data.lastName,
          login: data.userName,
          senha: data.userPassword,
          email: data.email
        })
        .then(res => {
          if (res.status === 200) {
            history.push('/login')
          }
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      // editar dados de  usuário já existente
      // await editUser()
      // console.log('EDITAR USUÁRIO', data)
      await axios
        .put('http://f1ca5156fd21.ngrok.io/user', {
          nome: data.firstName,
          sobrenome: data.lastName,
          login: user.login,
          novo_login: data.userName ? data.userName : dados.login,
          senha: data.userPassword ? data.userPassword : dados.senha,
          email: data.email ? data.email : dados.email
        })
        .then(res => {
          if (res.status === 200) {
            setUser(res.data)
            history.push('/home')
          }
          console.log(user)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  return (
    <div>
      {dados && <Navbar />}
      <Wrapper width='35%' {...{ maxWidth: 980 }} margin='6% auto' as='form' onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h3' align='center'>
          {dados ? 'Editar perfil' : 'Cadastro'}
        </Typography>
        <Row mt='5%' justifyContent='center'>
          <Column mr='7%'>
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
          </Column>
          <Column>
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
          </Column>
        </Row>
        <Row justifyContent='center'>
          <Column width='490px'>
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
              height='40px'
            />
          </Column>
        </Row>
        <Row justifyContent='center'>
          <Column mr='7%'>
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
              height='40px'
            />
          </Column>
          <Column>
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
          </Column>
        </Row>

        <Row flexDirection='row-reverse' mr='15%'>
          <FormControlLabel
            label='Mostrar senha'
            control={<Checkbox value='remember' color='primary' onClick={() => setShowPassword(!showPassword)} />}
          />
        </Row>
        <Row flexDirection='row-reverse' mt='20px' width='490px' m='4% auto'>
          <Button type='submit' fullWidth variant='contained' color='primary'>
            {dados?.id ? 'Salvar alterações' : 'Cadastrar'}
          </Button>
        </Row>
      </Wrapper>
    </div>
  )
}

export default Register
