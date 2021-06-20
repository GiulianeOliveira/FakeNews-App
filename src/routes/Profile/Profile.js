import React, { useContext } from 'react'
import Register from '../Register'
import { AuthContext } from '../../AuthProvider'

const Profile = () => {
  const [user] = useContext(AuthContext)
  return <Register dados={user} />
}

export default Profile

// testRoute={history.location.pathname.includes('/negocios/editar-perfil')}
