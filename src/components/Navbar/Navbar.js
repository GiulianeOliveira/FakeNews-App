import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import axios from 'axios'
import Row from '../Row'
import { Logo } from '../../theme/styles'
import FakeNewsLogo from '../../assets/images/FakeNewsLogo.png'
import Menu from '../Menu'
import { AuthContext } from '../../AuthProvider'

const getNotice = async setNotices => {
  await axios
    .get('http://localhost:3333/visualizarnoticia')
    // getNotices()
    // eslint-disable-next-line consistent-return
    .then(res => {
      if (res.status === 200) {
        return setNotices(res.data.reverse())
      }
    })
    .catch(error => {
      console.log(error)
    })
}

const Navbar = ({ setNotices }) => {
  const [, setUser] = useContext(AuthContext)
  const history = useHistory()
  return (
    <Row mt='24px' mr='32px' ml='32px' mb='64px' justifyContent='space-between'>
      <Logo src={FakeNewsLogo} height='70px' />
      <Row>
        {setNotices && (
          <Button color='primary' onClick={() => getNotice(setNotices)}>
            Atualizar página
          </Button>
        )}
        <Button color='primary' onClick={() => history.push('/home')}>
          Home
        </Button>
        <Menu align='center' setUser={setUser} />
      </Row>
    </Row>
  )
}

export default Navbar
