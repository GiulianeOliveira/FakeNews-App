import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import Home from './routes/Home'
import Register from './routes/Register'
import Profile from './routes/Profile'
import SignInSide from './routes/Logout'

const Authenticated = () => (
  <Switch>
    <Route path='/login' component={SignInSide} />
    <Route path='/cadastro' component={Register} />
    <Route path='/editar-cadastro' component={Profile} />
    <Route path='/home' component={Home} />
    <Redirect to='/login' />
  </Switch>
)

export default Authenticated
