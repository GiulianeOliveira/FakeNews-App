import React, { useState, useEffect, useContext } from 'react'
// import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Button, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import styled from 'styled-components'
import Row from '../Row'
import Column from '../Column'
import Card from '../Card'
import { AuthContext } from '../../AuthProvider'
// import { postComment } from '../../services'

const Comments = () => {
  const [user] = useContext(AuthContext)
  const [allComments, addComment] = useState([])
  const [comment, setComment] = useState()
  let { id } = useParams()
  id = id.replace(':', '')

  const getComments = async () => {
    await axios
      .get(`http://f1ca5156fd21.ngrok.io/visualizarcomentarios/${id}`)
      .then(res => {
        addComment(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getComments()
  }, [])

  const zeroFill = n => `0${n}`.slice(-2)

  const getHour = () => {
    // Pega o horário atual
    const now = new Date()

    // Formata a data conforme dd/mm/aaaa hh:ii:ss
    const dataHora = `${zeroFill(now.getFullYear())}-${zeroFill(now.getMonth() + 1)}-${now.getUTCDate()} ${zeroFill(
      now.getHours()
    )}:${zeroFill(now.getMinutes())}:${zeroFill(now.getSeconds())}`

    // Exibe na tela usando a div#data-hora
    return `${dataHora}`
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setComment(e.target.value)
  }

  const postComment = async () => {
    const date = getHour()
    await axios
      .post('http://f1ca5156fd21.ngrok.io/comentarnoticia', {
        noticiaId: id,
        login: user.login,
        data: date,
        conteudo: comment
      })
      .then(() => {
        getComments()
        setComment('')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Card>
      {allComments?.map(({ usuario, comentario, data }) => (
        <CommentColumn mt='10px'>
          <Row justifyContent='space-between'>
            <Typography>
              <b>{`${usuario}: `}</b>
            </Typography>
            <Typography variant='body'>{`${data.split('T')[0]} ${data.split('T')[1].replace('Z', '')}`}</Typography>
          </Row>
          <Row>
            <Typography>{comentario}</Typography>
          </Row>
        </CommentColumn>
      ))}
      <Column>
        <TextField
          variant='outlined'
          margin='normal'
          label='Comentar'
          name='comment'
          placeholder='Comentar'
          fullWidth
          height='40px'
          value={comment}
          onChange={e => handleSubmit(e)}
        />
        <Button
          type='submit'
          onClick={e => {
            e.preventDefault()
            if (comment !== '') {
              postComment()
            }
          }}
        >
          Enviar
        </Button>
      </Column>
    </Card>
  )
}

const CommentColumn = styled(Column)`
  background-color: #8080802e;
  padding: 8px 8px 8px 14px;
  border-radius: 8px;
  box-shadow: 0px 1px 0px 0px gray;
`

export default Comments
