import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Typography } from '@naveteam/saturn'
import Row from '../Row'

const Navbar = () => {
  const history = useHistory()
  return (
    <Row mt='24px' mr='32px' ml='32px' mb='64px' justifyContent='space-between'>
      <Link to='/home'>teste</Link>
      <Row>
        <Button variant='text' onClick={() => history.push('/sair')}>
          <Typography fontWeight='bold' fontSize='14px'>
            Sair
          </Typography>
        </Button>
      </Row>
    </Row>
  )
}

export default Navbar
