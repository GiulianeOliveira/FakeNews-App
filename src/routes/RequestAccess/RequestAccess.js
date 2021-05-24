import React from 'react'
import { useForm } from 'react-hook-form'
// import { useHistory } from 'react-router-dom'
import { TextField, Typography, Button } from '@material-ui/core'
// import axios from 'axios'
import Wrapper from '../../components/Wrapper'
import Row from '../../components/Row'
import Navbar from '../../components/Navbar'

const RequestAccess = () => {
  // console.log(dados, '<<<<<<<<<<<<<<<<<<<<<<<<<<')
  // const [showPassword, setShowPassword] = useState(false)
  // const history = useHistory()
  const { register, handleSubmit, setValue } = useForm()

  const onSubmit = async data => {
    console.log(data)
    // console.log('EDITAR USUÁRIO', data)
    // const completeName = data.userName && data.certification ? `${data.userName} ${data.certification}` : dados.nome
    // await axios
    //   .put('http://2b2326f7730e.ngrok.io/user', {
    //     nome: completeName,
    //     login: data.userName ? data.userName : dados.login,
    //     senha: data.userPassword ? data.userPassword : dados.senha,
    //     email: data.email ? data.email : dados.email
    //   })
    //   .then(res => {
    //     if (res.status === 200) {
    //       history.push('/login')
    //     }
    //     console.log(res.data)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }
  return (
    <div mb='200px'>
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
        <Typography variant='h4' align='center'>
          Solicitar acesso de especialista
        </Typography>

        <TextField
          variant='outlined'
          margin='normal'
          required
          label='Nome de usuário'
          name='userName'
          placeholder='Nome de usuário'
          width='280px'
          height='40px'
          {...register('userName')}
          onChange={e => setValue('userName', e.target.value)}
        />

        <TextField
          variant='outlined'
          margin='normal'
          required
          label='Formação/Profissão'
          name='formation'
          placeholder='Formação/Profissão'
          width='280px'
          height='40px'
          {...register('formation')}
          onChange={e => setValue('formation', e.target.value)}
        />

        <TextField
          {...register('category')}
          onChange={e => setValue('category', e.target.value)}
          variant='outlined'
          margin='normal'
          required
          label='Categoria'
          name='category'
          autoFocus
          placeholder='Categoria'
          width='280px'
          height='40px'
        />

        <TextField
          {...register('description')}
          onChange={e => setValue('description', e.target.value)}
          variant='outlined'
          margin='normal'
          required
          multiline
          rows={4}
          label='Por que você quer se tornar especialista?'
          name='description'
          autoFocus
          placeholder='Por que você quer se tornar especialista?'
          width='280px'
          height='140px'
        />

        <Typography>
          <b>Comprovante de especialista. Ex: certificação</b>
        </Typography>
        <Row mt='10px'>
          <input {...register('certification')} type='file' name='certification' />
        </Row>

        <Row flexDirection='row-reverse' mt='20px'>
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Solicitar acesso
          </Button>
        </Row>
      </Wrapper>
    </div>
  )
}

export default RequestAccess
