import React from 'react'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import Row from '../Row'
import Card from '../Card'
import { Logo } from '../../theme/styles'

const CardNotice = ({ title, description, image, click }) => (
  <ClickRow mt='20px' align='center' onClick={click}>
    <Card color='#f0f0f0'>
      <Row>
        <Typography variant='h5' align='left'>
          <b>{title}</b>
        </Typography>
      </Row>
      <Row mt='10px' mb='14px'>
        <Typography>{description}</Typography>
      </Row>
      <Logo src={`${image}`} height='350px' width='600px' />
    </Card>
  </ClickRow>
)

export default CardNotice

const ClickRow = styled(Row)`
  cursor: pointer;
`
