import React from 'react'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import Row from '../Row'
import Column from '../Column'
import Card from '../Card'
import NewsReview from '../NewsReview'
import { Logo } from '../../theme/styles'

// passar id da notícia pro NewsReview e lá fazer um get das avaliacoes

const CardNotice = ({ title, description, image, click, positiva, negativa, noticeId }) => (
  <ClickRow mt='35px' align='center'>
    <Card color='#8080802e'>
      <Row mb='40px'>
        <Typography variant='h5' align='left'>
          <b>{title}</b>
        </Typography>
      </Row>
      <Row mt='10px' mb='40px'>
        <Typography>{description}</Typography>
      </Row>
      <Column>
        <Row justifyContent='center' mb='20px'>
          <Logo src={image} height='350px' width='600px' onClick={click} />
        </Row>
        <NewsReview positiva={positiva} negativa={negativa} noticeId={noticeId} />
      </Column>
    </Card>
  </ClickRow>
)

export default CardNotice

const ClickRow = styled(Column)``
