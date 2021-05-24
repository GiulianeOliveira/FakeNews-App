import React from 'react'
import { Typography } from '@material-ui/core'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'

const Admin = () => {
  console.log('test')
  return (
    <>
      <Navbar />
      <Card>
        <Typography>Liberar acesso para especialista</Typography>
      </Card>
    </>
  )
}

export default Admin

// Usuario, profissao, categoria, motivo pq especialista e doc comprovante
