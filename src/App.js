import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import Authenticated from './Authenticated'
import { userContext } from './context/userContext'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates&display=swap');
  body {
    font-family: 'Montserrat Alternates', sans-serif;
  }
`

function App() {
  const user = { login: true, type: 'admin' }
  // const user = { login: true, type: 'especialista' }
  // const user = { login: true, type: 'comum' }

  return (
    <userContext.Provider value={user}>
      <GlobalStyle />
      <Router>
        <Authenticated />
      </Router>
    </userContext.Provider>
  )
}

export default App
//         <NotAuthenticated />
// import Authenticated from './Authenticated'
