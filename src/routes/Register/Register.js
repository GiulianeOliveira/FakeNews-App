import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Typography, Button } from '@material-ui/core'
import Wrapper from '../../components/Wrapper'
import Row from '../../components/Row'

const Register = () => {
  const { register, handleSubmit } = useForm()
  const onSubmit = data => console.log(data)
  return (
    <div backgroundColor='white'>
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
        <Typography variant='h4' color='black' align='center'>
          Cadastro
        </Typography>
        <Row mt='30px'>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Nome'
            name='firstName'
            autoFocus
            ref={register}
            placeholder='Nome'
            width='280px'
            height='40px'
          />
          <TextField
            ref={register}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Sobrenome'
            name='lastName'
            autoFocus
            placeholder='Sobrenome'
            width='280px'
            height='40px'
          />
        </Row>
        <Row mt='30px'>
          <TextField
            ref={register}
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
        <Row mt='30px'>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Nome de usuário'
            name='userName'
            autoFocus
            ref={register}
            placeholder='Nome de usuário'
            width='280px'
            height='40px'
          />
          <TextField
            ref={register}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Senha'
            name='userPassword'
            autoFocus
            placeholder='Senha'
            width='280px'
            height='40px'
          />
        </Row>
        <Row flexDirection='row-reverse' mt='40px'>
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Cadastrar
          </Button>
        </Row>
      </Wrapper>
    </div>
  )
}

export default Register
