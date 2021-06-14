import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { useUser } from './context/userContext'
import Home from './routes/Home'
import Register from './routes/Register'
import Profile from './routes/Profile'
import SignInSide from './routes/Logout'
import PostComments from './routes/PostComments'
import NewNotice from './routes/NewNotice'
import RequestAccess from './routes/RequestAccess'
import Admin from './routes/Admin'

const Authenticated = () => {
  const user = useUser()
  return (
    <Switch>
      <Route path='/login' component={SignInSide} />
      <Route path='/cadastro' component={Register} />
      {user?.login && <Route path='/editar-cadastro' component={Profile} />}
      {user?.login && <Route path='/visualizar-noticia:id' component={PostComments} />}
      {user?.login && <Route path='/nova-noticia' component={NewNotice} />}
      {user?.login && user?.type === 'comum' && <Route path='/solicitar-acesso' component={RequestAccess} />}
      {user?.login && user?.type === 'admin' && <Route path='/admin-denuncias' component={Admin} />}
      {user?.login && <Route path='/home' component={Home} />}
      {/* Aumentar fontes sobre as avaliações dos especialistas (colocar no feed talvez) */}
      {/* Arrumar os comentários para que possamos apagar */}
      {/* Visualizar noticia aparece diferente para usuário admin, especialista e comum */}
      {/* Quem postou a notícia e o admin podem apagar a notícia */}
      {/* Quem postou pode editar a notícia */}
      {/* Criar sub-rotas para que o admin tenha acesso a denúncias de: notícias e de usuários */}
      {/* Arrumar o que vem no menu para cada tipo de usuário */}
      {/* Criar rota para admin avaliar requisições de especialistas */}
      <Redirect to='/login' />
    </Switch>
  )
}

export default Authenticated

// To-do geral do projeto:
//   - Inserir avisos para os usuários. Ex: senha/usuário inválido, notícia criada, notícia excluída, notícia/usuário denunciado
//   - Inserir validação de login. Ex: permitir acesso a determinadas rotas dependendo do tipo de usuário
//   - Fazer integração com o back-end
