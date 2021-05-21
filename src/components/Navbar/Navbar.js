import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import Row from '../Row'
import { Logo } from '../../theme/styles'
import FakeNewsLogo from '../../assets/images/FakeNewsLogo.png'
import Menu from '../Menu'

const Navbar = () => {
  const history = useHistory()
  return (
    <Row mt='24px' mr='32px' ml='32px' mb='64px' justifyContent='space-between'>
      <Logo src={FakeNewsLogo} height='70px' />
      <Row>
        <Button color='primary' onClick={() => history.push('/home')}>
          Home
        </Button>
        <Menu align='center' />
        <Button color='primary' onClick={() => history.push('/sair')}>
          Sair
        </Button>
      </Row>
    </Row>
  )
}

export default Navbar
