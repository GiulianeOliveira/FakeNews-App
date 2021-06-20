import React, { useContext } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import Home from './routes/Home'
import Register from './routes/Register'
import Profile from './routes/Profile'
import SignInSide from './routes/Logout'
import PostComments from './routes/PostComments'
import NewNotice from './routes/NewNotice'
import RequestAccess from './routes/RequestAccess'
import Admin from './routes/Admin'
import Reports from './routes/Reports'
import AnalysisSpecialistRequest from './routes/AnalysisSpecialistRequest'
import { AuthContext } from './AuthProvider'

const Authenticated = () => {
  const [user, setUser] = useContext(AuthContext)
  console.log(user, setUser, 'TESTEEEEE')
  return (
    <Switch>
      <Route path='/login' component={SignInSide} />
      <Route path='/cadastro' component={Register} />
      {user && <Route path='/editar-cadastro' component={Profile} />}
      {user && <Route path='/visualizar-noticia:id' component={PostComments} />}
      {user && <Route path='/nova-noticia' component={NewNotice} />}
      {user && <Route path='/denunciar-noticia:id' component={Reports} />}
      {user && <Route path='/denunciar-usuario:id' component={Reports} />}
      {user && user?.tipo === 'normal' && !user.especialista && (
        <Route path='/solicitar-acesso' component={RequestAccess} />
      )}
      {user && user?.tipo === 'admin' && <Route path='/admin-denuncias' component={Admin} />}
      {user && user?.tipo === 'admin' && <Route path='/solicitacoes' component={AnalysisSpecialistRequest} />}
      {user && <Route path='/home' component={Home} />}
      {/* Aumentar fontes sobre as avaliações dos especialistas (colocar no feed talvez) */}
      {/* Arrumar os comentários para que possamos apagar */}
      {/* Visualizar noticia aparece diferente para usuário admin, especialista e comum */}
      {/* Quem postou a notícia e o admin podem apagar a notícia */}
      {/* Quem postou pode editar a notícia */}
      {/* Criar sub-rotas para que o admin tenha acesso a denúncias de: notícias e de usuários */}
      <Redirect to='/login' />
    </Switch>
  )
}

export default Authenticated

// To-do geral do projeto:
//   - Inserir avisos para os usuários. Ex: senha/usuário inválido, notícia criada, notícia excluída, notícia/usuário denunciado
//   - Inserir validação de login. Ex: permitir acesso a determinadas rotas dependendo do tipo de usuário
//   - Fazer integração com o back-end
