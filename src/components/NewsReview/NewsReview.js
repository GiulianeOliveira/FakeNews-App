import React, { useState, useContext } from 'react'
import axios from 'axios'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import Row from '../Row'
import Column from '../Column'
import { StyledTypography } from '../../helpers/styles'
import { AuthContext } from '../../AuthProvider'

const NewsReview = ({ positiva, negativa, noticeId }) => {
  const [user] = useContext(AuthContext)
  const [isVote, setVote] = useState(false)
  const [oldVote, setOldVote] = useState(false)

  const onSubmit = async voto => {
    await axios
      .put('http://f1ca5156fd21.ngrok.io/avaliar', { login: user.login, noticiaId: noticeId, avaliacao: voto })
      .then(() => {
        setVote(true)
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 500') {
          setOldVote(true)
        }
      })
  }

  return (
    <Column margin='auto'>
      {user.especialista && (
        <Row justifyContent='center'>
          <Column mr='100px'>
            <Row alignItems='center'>
              <Column mr='5px'>
                <button
                  type='submit'
                  onClick={event => {
                    event.preventDefault()
                    onSubmit('fato')
                  }}
                >
                  <Row alignItems='center'>
                    <Column mr='10px'>
                      <StyledTypography>{oldVote ? 'Já votou' : 'É fato'}</StyledTypography>
                    </Column>
                    {isVote ? <StyledTypography>{positiva}%</StyledTypography> : <ThumbUpAltIcon />}
                    {oldVote && <StyledTypography>{positiva}%</StyledTypography>}
                  </Row>
                </button>
              </Column>
            </Row>
          </Column>
          <Column mr='100px'>
            <Row alignItems='center'>
              <Column mr='5px'>
                <button
                  type='submit'
                  onClick={event => {
                    event.preventDefault()
                    onSubmit('fake')
                  }}
                >
                  <Row alignItems='center'>
                    <Column mr='10px'>
                      <StyledTypography>{oldVote ? 'Já votou' : 'É fake'}</StyledTypography>
                    </Column>
                    {isVote ? <StyledTypography>{negativa}%</StyledTypography> : <ThumbDownAltIcon />}
                    {oldVote && <StyledTypography>{negativa}%</StyledTypography>}
                  </Row>
                </button>
              </Column>
            </Row>
          </Column>
        </Row>
      )}
      {!user.especialista && (
        <Column mr='16px'>
          <Row>
            <StyledTypography>{positiva}% dos especialistas confirmam que esta notícia é fato.</StyledTypography>
          </Row>
          <Row>
            <StyledTypography>{negativa}% dos especialistas confirmam que esta notícia é fake.</StyledTypography>
          </Row>
        </Column>
      )}
    </Column>
  )
}

export default NewsReview
