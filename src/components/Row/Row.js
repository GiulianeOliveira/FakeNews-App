import styled from 'styled-components'
import { space, layout, color, flexbox, border, shadow, position } from 'styled-system'
import propTypes from 'prop-types'

const Row = styled.div(
  {
    display: 'flex'
  },
  flexbox,
  space,
  layout,
  color,
  border,
  shadow,
  position
)

Row.propTypes = {
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.color,
  ...propTypes.flexbox,
  ...propTypes.border,
  ...propTypes.shadow,
  ...propTypes.position
}

export const RowDesktop = styled(Row)`
  display: none;
  @media (min-width: 1200px) {
    display: flex;
  }
`

export default Row
