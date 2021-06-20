import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { TextField, Typography, Button } from '@material-ui/core'
import axios from 'axios'
import Wrapper from '../../components/Wrapper'
import Row from '../../components/Row'
import Column from '../../components/Column'
import Navbar from '../../components/Navbar'
import { AuthContext } from '../../AuthProvider'

const RequestAccess = () => {
  const history = useHistory()
  const { register, handleSubmit, setValue } = useForm()
  const [user] = useContext(AuthContext)

  const onSubmit = async data => {
    console.log(data)

    await axios
      .post(`http://localhost:3333/askpromotion?login=${user.login}`, {
        formacao: data.formation,
        certificado: data.certification,
        descricao: data.description
      })
      .then(() => {
        history.push('/home')
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <div mb='200px'>
      <Navbar />
      <Wrapper width='25%' {...{ maxWidth: 792 }} margin='6% auto' as='form' onSubmit={handleSubmit(onSubmit)}>
        <Row justifyContent='center'>
          <Typography variant='h4'>Solicitar acesso de Especialista</Typography>
        </Row>

        <Column mt='30px'>
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

          <TextField
            label='Certificação'
            placeholder='Url do comprovante'
            variant='outlined'
            margin='normal'
            required
            name='certification'
            width='280px'
            height='40px'
            {...register('certification')}
            onChange={e => setValue('certification', e.target.value)}
          />

          <Row flexDirection='row-reverse' mt='20px'>
            <Button type='submit' fullWidth variant='contained' color='primary'>
              Solicitar acesso
            </Button>
          </Row>
        </Column>
      </Wrapper>
    </div>
  )
}

export default RequestAccess
