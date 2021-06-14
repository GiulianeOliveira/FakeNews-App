import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PostAddIcon from '@material-ui/icons/PostAdd'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import WarningIcon from '@material-ui/icons/Warning'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Row from '../Row'
import { useUser } from '../../context/userContext'

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
  const user = useUser()

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
        <StyledMenuItem onClick={() => history.push('/nova-noticia')}>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary='Adicionar notícia' />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => history.push('/editar-cadastro')}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary='Perfil' />
        </StyledMenuItem>

        {user.type === 'comum' && (
          <StyledMenuItem onClick={() => history.push('/solicitar-acesso')}>
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary='Solicitar acesso de especialista' />
          </StyledMenuItem>
        )}

        {user.type === 'admin' && (
          <StyledMenuItem>
            <ListItemIcon>
              <WarningIcon />
            </ListItemIcon>
            <ListItemText primary='Denúncias (admin)' onClick={() => history.push('/admin-denuncias')} />
          </StyledMenuItem>
        )}

        <StyledMenuItem>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary='Sair' />
        </StyledMenuItem>
      </StyledMenu>
    </Row>
  )
}
