import React, { forwardRef } from 'react'
import styled from 'styled-components'

import Row from '../Row'

const Column = forwardRef((props, ref) => <Row ref={ref} flexDirection='column' {...props} />)

export const ColumnDesktop = styled(Column)`
  display: none;
  @media (min-width: 1200px) {
    display: flex;
  }
`

export default Column
