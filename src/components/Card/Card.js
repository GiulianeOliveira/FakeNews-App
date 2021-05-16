import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

const Card = ({ height, width, children, ...props }) => (
  <EmptyCard height={height} width={width} {...props}>
    {children}
  </EmptyCard>
)

const EmptyCard = styled.div`
  background-color: white;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px;
  display: inline;
  flex-direction: row;
  cursor: pointer;
`
Card.defaultProps = {
  height: '420px',
  width: '281px'
}

Card.propTypes = {
  height: propTypes.string,
  width: propTypes.string
}

export default Card
