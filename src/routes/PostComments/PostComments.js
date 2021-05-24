import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Button, Typography, TextField } from '@material-ui/core'
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import WarningIcon from '@material-ui/icons/Warning'
// import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Navbar from '../../components/Navbar'
import Column from '../../components/Column'
import Row from '../../components/Row'
import Card from '../../components/Card'
import { Logo } from '../../theme/styles'
import NoticiaMockada from '../../assets/images/NoticiaMockada.jpg'

const noticiaMock = {
  titulo: 'Hebraica tem excesso de vacinas contra a Covid-19 e doses estão prestes a vencer',
  descricao:
    'O clube Hebraica, na Zona Sul de São Paulo, tem uma sobra de vacinas contra a Covid-19, que podem ser descartadas ou perdidas caso não sejam usadas a tempo.',
  imagem: NoticiaMockada,
  id: 1,
  tipo: 'coronavirus',
  avaliacoes: { positivas: 2, negativas: 1 },
  comentarios: [
    'Não acredito que algo como isto seja verdade!',
    'Espero que algum especialista possa nos confirmar a informação.'
  ]
}

// fazer um get pro back-end e buscar a notícia pelo id, o id vem pelo pathname da rota!
const commentsDefaults = {
  comments: 'Espero que algum especialista possa nos confirmar a informação.'
}

const PostComments = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      titleNews: '',
      descriptionNews: '',
      imageNews: '',
      reviews: '',
      comments: [commentsDefaults]
    }
  })

  const onSubmit = data => {
    console.log(data)
  }
  // , append, remove - INSERIR NOVAMENTE NO USEFIELD
  const { fields } = useFieldArray({
    control,
    name: 'comments'
  })

  return (
    <>
      <Navbar />
      <Column {...{ maxWidth: 792 }} margin='auto'>
        <Card backgroundColor='white' marginBottom='15px'>
          <Row>
            <Typography variant='h4'>
              <b>{noticiaMock.titulo}</b>
            </Typography>
          </Row>
          <Row mt='20px' mb='14px'>
            <Typography>{noticiaMock.descricao}</Typography>
          </Row>
          <Column width='600px'>
            <Logo src={`${noticiaMock.imagem}`} height='350px' width='600px' />
            <Row alignItems='center' justifyContent='space-between' flexDirection='row-reverse' mt='8px' mb='8px'>
              <Row alignItems='center'>
                <WarningIcon />
                <Button onClick={() => 'REDIRECIONAR PARA DENÚNCIA'}>Denunciar notícia</Button>
              </Row>
            </Row>
            <Row alignItems='center'>
              <Column mr='16px'>
                <Row>
                  <Typography>5 especialistas confirmam que esta notícia é fato.</Typography>
                </Row>
              </Column>
              <Row>
                <Typography>25 especialistas confirmam que esta notícia é fake.</Typography>
              </Row>

              {/* <Row alignItems='center'> USERS ESPECIALISTAS
                <Column mr='16px'>
                  <Row>
                    <Typography>É fato</Typography>
                    <ThumbUpAltIcon />
                    <Typography>5</Typography>
                  </Row>
                </Column>
                <Row>
                  <Typography>É fake</Typography>
                  <ThumbDownAltIcon />
                  <Typography>25</Typography>
                </Row>
              </Row> */}
            </Row>
          </Column>
        </Card>

        <Card>
          <Column mb='4px'>
            <Typography>Notícia publicada por:</Typography>
            <Row width='600px' mb='15px' alignItems='center' justifyContent='space-between'>
              <Row>
                <AccountCircleIcon />
                <Typography>Maria do Carmo </Typography>
              </Row>
              <Row alignItems='center'>
                <WarningIcon />
                <Button onClick={() => 'REDIRECIONAR PARA DENÚNCIA'}>Denunciar usuário</Button>
              </Row>
            </Row>
          </Column>

          <Typography variant='h6'>
            <b>Comentários</b>
          </Typography>
          {!!fields.length &&
            fields.map((field, index) => (
              <Column key={field.id}>
                <Column>
                  <Column>
                    <Row>
                      <AccountCircleIcon />
                      <Typography>
                        <b>Pedro:</b>
                      </Typography>
                    </Row>
                    <Typography>{field.comments}</Typography>
                  </Column>
                </Column>
                <TextField
                  name={`comments[${index}][comments]`}
                  label='Comentário'
                  placeholder='Comentário'
                  mt='30px'
                  {...register('[comments]')}
                />
                <Button onSubmit={handleSubmit(onSubmit)}>Comentar</Button>
              </Column>
            ))}
        </Card>
        {/* <Button width={2 / 4} mt='30px' onClick={() => append(commentsDefaults)}>
          Adicionar novo Comentário
        </Button>
        <Button width={2 / 4} mt='30px' onClick={() => remove(0)}>
          Remover primeiro Comentário
        </Button> */}
      </Column>
    </>
  )
}

export default PostComments
