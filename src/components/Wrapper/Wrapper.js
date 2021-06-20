import React from 'react'
import { useHistory } from 'react-router-dom'
import propTypes from 'prop-types'
import { Icon } from '@material-ui/core'
import styled from 'styled-components'
import Column from '../Column'

const Wrapper = ({ children, color, hasIconBack, path, ...props }) => {
  const history = useHistory()
  return (
    <Column bg={color} {...props}>
      {hasIconBack && (
        <IconBack onClick={() => history.push(path)}>
          <Icon icon='arrow_back_ios' height='40px' width='46px' />
        </IconBack>
      )}
      {children}
    </Column>
  )
}

Wrapper.defaultProps = {
  color: 'white',
  hasIconBack: false
}

Wrapper.propTypes = {
  color: propTypes.string,
  hasIconBack: propTypes.bool
}

const IconBack = styled(Column)`
  cursor: pointer;
  position: absolute;
  margin-right: 30px;
  margin-left: -120px;
  margin-top: 4px;
`

export default Wrapper
// width='996px' height='732px'
