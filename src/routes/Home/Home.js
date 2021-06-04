import React from 'react'
import { useHistory } from 'react-router-dom'
// import { Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import CardNotice from '../../components/CardNotice'
import Column from '../../components/Column'
import Navbar from '../../components/Navbar'
import NoticiaMockada from '../../assets/images/NoticiaMockada.jpg'
import NoticiaMockada2 from '../../assets/images/NoticiaMockada2.png'

// dados mockados
const noticias = [
  {
    titulo: 'Hebraica tem excesso de vacinas contra a Covid-19 e doses estão prestes a vencer',
    descricao:
      'O clube Hebraica, na Zona Sul de São Paulo, tem uma sobra de vacinas contra a Covid-19, que podem ser descartadas ou perdidas caso não sejam usadas a tempo.',
    imagem: NoticiaMockada,
    id: 1,
    tipo: 'coronavirus',
    avaliacoes: { positivas: 2, negativas: 1 },
    comentarios: ''
  },
  {
    titulo: 'WhatsApp mudou "furtivamente" configuração de grupos no aplicativo',
    descricao:
      'Circula pelas redes sociais uma mensagem que diz que o WhatsApp "furtivamente" mudou a configuração de grupos para que todas as pessoas, inclusive desconhecidas, possam adicionar um usuário a um grupo, incluindo chats de apostas e grupos de fraude financeira. ',
    imagem: NoticiaMockada2,
    id: 2,
    tipo: 'tecnologia',
    avaliacoes: { positivas: 6, negativas: 0 },
    comentarios:
      'WhatsApp afirma que a configuração padrão sempre foi a de possibilitar que qualquer pessoa adicione um usuário a um grupo. Ou seja, não houve mudança, muito menos "furtiva" ou em 2021. Em 2019, WhatsApp permitiu, na verdade, que usuários que não desejam ser adicionados em grupos por pessoas que desconhecem mudem isso no aplicativo.'
  }
]

const Home = () => {
  const history = useHistory()
  return (
    <>
      <Navbar />
      <Column width='40%' {...{ maxWidth: 980 }} margin='auto' as='form'>
        <Typography variant='h4' align='center'>
          Feed de notícias
        </Typography>
        {noticias.map(noticia => (
          <CardNotice
            key={noticia.id}
            click={() => history.push(`/visualizar-noticia:${noticia.id}`)}
            title={noticia.titulo}
            description={noticia.descricao}
            image={noticia.imagem}
          />
        ))}
      </Column>
    </>
  )
}

export default Home
