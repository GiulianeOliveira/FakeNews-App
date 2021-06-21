import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { TextField, Typography, Button } from '@material-ui/core'
import axios from 'axios'
import Wrapper from '../../components/Wrapper'
import Row from '../../components/Row'
import Navbar from '../../components/Navbar'
import { AuthContext } from '../../AuthProvider'

// PRONTO
const Reports = () => {
  const [user] = useContext(AuthContext)
  const history = useHistory()
  const params = useParams()
  const { id } = params
  const { register, handleSubmit, setValue } = useForm()
  const isUserReport = history.location.pathname.includes('/denunciar-usuario')

  const onSubmit = async data => {
    if (isUserReport) {
      await axios // REPORT USUÁRIO
        .post('http://localhost:3333/report', {
          denunciante: user.login,
          denunciado: id.split(':')[2],
          conteudo: data.reason,
          data: '2021-06-18'
        })

        .then(res => {
          if (res.status === 200) {
            history.push('/home')
          }
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      // REPORT NOTÍCIA
      console.log(user.login, 'REPORT NOTICIA')
      await axios
        .post(`http://localhost:3333/denuncia?login=${user.login}&noticia_id=${id.replace(':', '')}`, {
          conteudo: data.reason,
          data: '2021-06-18'
        })

        .then(res => {
          if (res.status === 200) {
            history.push(`/visualizar-noticia${id}`)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <div>
      <Navbar />
      <Wrapper width='25%' {...{ maxWidth: 980 }} margin='9% auto' as='form' onSubmit={handleSubmit(onSubmit)}>
        <Row mb='20px' justifyContent='center'>
          <Typography variant='h3'> {isUserReport ? 'Denunciar usuário' : 'Denunciar notícia'}</Typography>
        </Row>

        <TextField
          {...register('reason')}
          onChange={e => setValue('reason', e.target.value)}
          variant='outlined'
          margin='normal'
          required
          multiline
          rows={7}
          label='Motivo da denúncia'
          name='reason'
          autoFocus
          placeholder='Motivo da denúncia'
        />

        <Row mt='20px'>
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Denunciar
          </Button>
        </Row>
      </Wrapper>
    </div>
  )
}

export default Reports
