import React from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import Row from '../Row'
import Column from '../Column'
import { StyledTypography } from '../../helpers/styles'

const NewsReview = () => {
  const user = { admin: true, normal: false }
  console.log('teste')
  return (
    <Row alignItems='center' padding='0px 10px'>
      {user.admin && (
        <Row>
          <Column mr='16px'>
            <Row alignItems='center'>
              <StyledTypography>É fato</StyledTypography>
              <ThumbUpAltIcon />
              <StyledTypography>5</StyledTypography>
            </Row>
          </Column>
          <Row alignItems='center'>
            <StyledTypography>É fake</StyledTypography>
            <ThumbDownAltIcon />
            <StyledTypography>25</StyledTypography>
          </Row>
        </Row>
      )}
      {user.normal && (
        <>
          <Column mr='16px'>
            <Row>
              <StyledTypography>5 especialistas confirmam que esta notícia é fato.</StyledTypography>
            </Row>
          </Column>
          <Row>
            <StyledTypography>25 especialistas confirmam que esta notícia é fake.</StyledTypography>
          </Row>
        </>
      )}

      {/*  */}
    </Row>
  )
}

export default NewsReview
