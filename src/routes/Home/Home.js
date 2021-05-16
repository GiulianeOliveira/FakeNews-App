import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Button } from '@material-ui/core'
import styled from 'styled-components'
import Row from '../../components/Row'
import Column from '../../components/Column'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'

const Home = () => {
  const history = useHistory()
  const [isOpenModal] = useState(true)
  return (
    <>
      <Card>TESTE SDAHSUHDUASH</Card>
      <Navbar />
      <Column mt='64px'>
        {isOpenModal && <ChangeBackground />}
        <Row alignItems='center' justifyContent='space-between'>
          <Typography
            fontWeight='600px'
            fontSize='40px'
            lineHeight='48px'
            ml='32px'
            variant='h4'
            color='black'
            align='center'
          >
            Teste
          </Typography>
          <Button
            variant='contained'
            color='primary'
            width='176px'
            height='40px'
            mr='32px'
            onClick={() => history.push('cadastro')}
          >
            Adicionar Usuario
          </Button>
        </Row>
      </Column>
    </>
  )
}

const ChangeBackground = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  height: 100%;
  width: 100%;
`

export default Home
