import React, { useState, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
import { Button, TextField, Typography } from '@material-ui/core'
import styled from 'styled-components'
import Row from '../Row'
import Column from '../Column'
import Card from '../Card'

const mocksComments = [
  { usuario: 'Joana', comentario: 'Blablabla' },
  { usuario: 'Pedro', comentario: 'Blablabla' },
  { usuario: 'Renata', comentario: 'Blablabla' }
]

const Comments = () => {
  const [allComments, addComment] = useState(mocksComments)
  const [comment, setComment] = useState({ comentario: '' })

  const handleSubmit = async e => {
    e.preventDefault()
    setComment({ comentario: e.target.value })
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

  useEffect(() => {
    console.log(allComments)
  }, [allComments])

  return (
    <Card>
      {allComments.map(({ usuario, comentario }) => (
        <CommentColumn mt='10px'>
          <Row>
            <Typography>
              <b>{`${usuario}: `}</b>
            </Typography>
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
          onChange={e => handleSubmit(e)}
        />
        <Button
          type='submit'
          onClick={e => {
            e.preventDefault()
            if (comment.comentario !== '') {
              const formattedComment = { usuario: 'Giuliane', comentario: comment.comentario }
              const teste = [...allComments, formattedComment]
              addComment(teste)
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
