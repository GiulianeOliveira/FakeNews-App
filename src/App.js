import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import Authenticated from './Authenticated'
import { AuthProvider } from './AuthProvider'
// import { userContext } from './context/userContext'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates&display=swap');
  body {
    font-family: 'Montserrat Alternates', sans-serif;
    background-color: 'white';
  }
`

function App() {
  // const user = { login: true, type: 'comum' }
  // const user = { login: true, type: 'especialista' }
  // const user = { login: true, type: 'comum' }

  return (
    <AuthProvider>
      <>
        <GlobalStyle />
        <Router>
          <Authenticated />
        </Router>
      </>
    </AuthProvider>
  )
}

export default App
//         <NotAuthenticated />
// import Authenticated from './Authenticated'
