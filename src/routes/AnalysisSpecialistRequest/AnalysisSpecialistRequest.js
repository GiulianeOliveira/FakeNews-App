import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import Column from '../../components/Column'
import Row from '../../components/Row'
import CardSpecialists from '../../components/CardSpecialists'

// Fazer useEffect e sempre que deletar uma notícia da refresh na página

const AnalysisSpecialistRequest = () => {
  const [solicitacoes, setSolicitacoes] = useState([])
  const [valid, setValid] = useState(false)

  const getAccess = async () => {
    // await viewNotice(id)
    await axios
      .get('http://e060003e3f5e.ngrok.io/usuarioacesso')
      // eslint-disable-next-line consistent-return
      .then(res => {
        setSolicitacoes(res.data)
        setValid(false)
      })
      .catch(error => {
        console.log(error)
      })
  }
  console.log(solicitacoes, '<<<<<<<')

  useEffect(() => {
    getAccess()
    console.log(solicitacoes, '<<<<<<<')
  }, [valid])

  return (
    <>
      <Navbar />
      <Column {...{ maxWidth: 980 }} m='auto'>
        <Row mb='20px' justifyContent='center'>
          <Typography variant='h4' component='h2'>
            Avaliação de especialistas
          </Typography>
        </Row>
        {solicitacoes?.map(dado => (
          <Column maxWidth='100%'>
            <CardSpecialists key={dado.login} dados={dado} setValid={setValid} />
          </Column>
        ))}
      </Column>
      {solicitacoes.length < 1 && (
        <Column margin='10% auto' width='400px'>
          <div align='center'>
            <FontMessage>Não há avaliações disponíveis.</FontMessage>
          </div>
        </Column>
      )}
    </>
  )
}

export default AnalysisSpecialistRequest

const FontMessage = styled.p`
  font-size: larger;
`
