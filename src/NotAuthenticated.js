import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SignInSide from './routes/Logout'

const NotAuthenticated = () => {
  console.log('oi')
  return (
    <Switch>
      <Route path='/sair' component={SignInSide} />
    </Switch>
  )
}

export default NotAuthenticated
