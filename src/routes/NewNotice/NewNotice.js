import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { TextField, Typography, Button } from '@material-ui/core'
import axios from 'axios'
import Wrapper from '../../components/Wrapper'
import Row from '../../components/Row'
import Navbar from '../../components/Navbar'

// PRONTO
const NewNotice = () => {
  const history = useHistory()

  const { register, handleSubmit, setValue } = useForm()

  const onSubmit = async data => {
    console.log('NOVA NOTÍCIA', data)
    await axios
      .post('http://5eabf77fa781.ngrok.io/crianoticia', {
        login: 'Teste12',
        titulo: data.notice_title,
        imagem: data.img,
        descricao: data.description
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
  }

  return (
    <div>
      <Navbar />
      <Wrapper
        mt='10%'
        hasIconBack
        path='/sair'
        width='25%'
        {...{ maxWidth: 980 }}
        margin='auto'
        as='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant='h3' align='center'>
          Nova notícia
        </Typography>
        <TextField
          variant='outlined'
          margin='normal'
          required
          label='Título'
          name='notice_title'
          placeholder='Título'
          width='280px'
          height='40px'
          {...register('notice_title')}
          onChange={e => setValue('notice_title', e.target.value)}
        />

        <TextField
          {...register('description')}
          onChange={e => setValue('description', e.target.value)}
          variant='outlined'
          margin='normal'
          required
          multiline
          rows={4}
          label='Descrição'
          name='description'
          autoFocus
          placeholder='Descrição'
          width='280px'
          height='140px'
        />

        <Typography>
          <b>Url imagem</b>
        </Typography>
        {/* <Row mt='10px'>
          <input {...register('image')} type='file' name='image' accept='image/png, image/jpeg' />
        </Row> */}
        <TextField
          variant='outlined'
          margin='normal'
          required
          label='Url imagem'
          name='img'
          placeholder='Url imagem'
          width='280px'
          height='40px'
          {...register('img')}
          onChange={e => setValue('img', e.target.value)}
        />

        <Row flexDirection='row-reverse' mt='20px'>
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Criar notícia
          </Button>
        </Row>
      </Wrapper>
    </div>
  )
}

export default NewNotice
