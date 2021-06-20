import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import axios from 'axios'
import { AirlineSeatIndividualSuiteRounded } from '@material-ui/icons'
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
      .get('http://7472f2cb3d3b.ngrok.io/usuarioacesso')
      // eslint-disable-next-line consistent-return
      .then(res => {
        setSolicitacoes(res.data)
        AirlineSeatIndividualSuiteRounded(false)
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
    </>
  )
}

export default AnalysisSpecialistRequest
