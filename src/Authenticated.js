import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import Home from './routes/Home'
import Register from './routes/Register'
import Profile from './routes/Profile'
import SignInSide from './routes/Logout'
import PostComments from './routes/PostComments'
import NewNotice from './routes/NewNotice'
import RequestAccess from './routes/RequestAccess'
import Admin from './routes/Admin'

const Authenticated = () => (
  <Switch>
    <Route path='/login' component={SignInSide} />
    <Route path='/cadastro' component={Register} />
    <Route path='/editar-cadastro' component={Profile} />
    <Route path='/solicitar-acesso' component={RequestAccess} />
    <Route path='/visualizar-noticia:id' component={PostComments} />
    {/* Aumentar fontes sobre as avaliações dos especialistas (colocar no feed talvez) */}
    {/* Criar modal de denunciar usuário e denunciar notícia, talvez de denunciar comentários também */}
    {/* Arrumar os comentários para que possamos apagar */}
    {/* Visualizar noticia aparece diferente para usuário admin, especialista e comum */}
    {/* Quem postou a notícia e o admin podem apagar a notícia */}
    {/* Quem postou pode editar a notícia */}
    <Route path='/nova-noticia' component={NewNotice} />
    <Route path='/admin-denuncias' component={Admin} />
    {/* Criar sub-rotas para que o admin tenha acesso a denúncias de: notícias e de usuários */}
    <Route path='/home' component={Home} />
    {/* Arrumar o que vem no menu para cada tipo de usuário */}
    {/* Criar rota para admin avaliar requisições de especialistas */}
    <Redirect to='/login' />
  </Switch>
)

export default Authenticated

// To-do geral do projeto:
//   - Inserir avisos para os usuários. Ex: senha/usuário inválido, notícia criada, notícia excluída, notícia/usuário denunciado
//   - Inserir validação de login. Ex: permitir acesso a determinadas rotas dependendo do tipo de usuário
//   - Fazer integração com o back-end
