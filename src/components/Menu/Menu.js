import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Row from '../Row'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 65,
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem)

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = useState(null)
  const history = useHistory()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Row>
      <Button aria-controls='customized-menu' aria-haspopup='true' color='primary' onClick={handleClick}>
        Menu
      </Button>
      <StyledMenu id='customized-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <StyledMenuItem onClick={() => history.push('/login')}>
          <ListItemIcon>Ícone</ListItemIcon>
          <ListItemText primary='Adicionar notícia' />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => history.push('/editar-cadastro')}>
          <ListItemIcon>Ícone</ListItemIcon>
          <ListItemText primary='Perfil' />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>Ícone</ListItemIcon>
          <ListItemText primary='Solicitar acesso de especialista' />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>Ícone</ListItemIcon>
          <ListItemText primary='Denúncias (admin)' />
        </StyledMenuItem>
      </StyledMenu>
    </Row>
  )
}
