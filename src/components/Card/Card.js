import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

const Card = ({ height, width, children, color, marginBottom, ...props }) => (
  <EmptyCard color={color} height={height} width={width} {...props} marginBottom={marginBottom}>
    {children}
  </EmptyCard>
)

const EmptyCard = styled.div`
  background-color: ${({ color }) => color};
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 30px;
  display: inline;
  flex-direction: row;
  cursor: pointer;
  margin-bottom: ${({ marginBottom }) => marginBottom};
`
Card.defaultProps = {
  height: '400px',
  width: '400px'
}

Card.propTypes = {
  height: propTypes.string,
  width: propTypes.string
}

export default Card
