import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import Navbar from '../../components/Navbar'
import Column from '../../components/Column'
import Row from '../../components/Row'
import ReportNotice from '../../components/ReportNotice'

// Fazer useEffect e sempre que deletar uma notícia da refresh na página

const Admin = () => {
  const [noticesReported, setNoticesReported] = useState([])
  const [isDeletedReportedNotice, setIsDeletedReportedNotice] = useState(false)
  const [usersReported, setUsersReported] = useState([])
  const [isDeletedReportedUser, setIsDeletedReportedUser] = useState(false)

  const getReportNotice = async () => {
    await axios
      .get('http://localhost:3333/noticiadenuncia')
      .then(res => {
        console.log(res.data, 'USUARIO RETORNADO')
        setNoticesReported(res.data)
        setIsDeletedReportedNotice(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getReportNotice()
  }, [isDeletedReportedNotice])

  const getReportedUsers = async () => {
    await axios
      .get('http://localhost:3333/usuariodenuncia')
      .then(res => {
        setUsersReported(res.data)
        setIsDeletedReportedUser(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getReportedUsers()
  }, [isDeletedReportedUser])

  return (
    <>
      <Navbar />
      <Row {...{ maxWidth: 980 }} m='80px auto 130px'>
        <Column mr='200px'>
          <Row mb='20px' justifyContent='center'>
            <Typography variant='h4' component='h2'>
              Notícias denunciadas
            </Typography>
          </Row>
          {noticesReported?.map(dado => (
            <Column maxWidth='100%'>
              <ReportNotice key={dado.id} dados={dado} setIsDeletedReportedNotice={setIsDeletedReportedNotice} />
            </Column>
          ))}
          {noticesReported.length < 1 && (
            <Column margin='20% auto' width='400px'>
              <div align='center'>
                <FontMessage>Não há notícias denunciadas.</FontMessage>
              </div>
            </Column>
          )}
        </Column>
        <Column>
          <Row mb='20px' justifyContent='center'>
            <Typography variant='h4' component='h2'>
              Usuários denunciados
            </Typography>
          </Row>
          {usersReported?.map(dado => (
            <Column width='400px'>
              <ReportNotice isUser key={dado.id} dados={dado} setIsDeletedReportedUser={setIsDeletedReportedUser} />
            </Column>
          ))}
          {noticesReported.length < 1 && (
            <Column margin='20% auto' width='400px'>
              <div align='center'>
                <FontMessage>Não há usuários denunciados.</FontMessage>
              </div>
            </Column>
          )}
        </Column>
      </Row>
    </>
  )
}

export default Admin

const FontMessage = styled.p`
  font-size: larger;
`
