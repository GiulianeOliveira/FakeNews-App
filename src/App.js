import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import Authenticated from './Authenticated'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates&display=swap');
  body {
    font-family: 'Montserrat Alternates', sans-serif;
  }
`

function App() {
  // const user = { login: false }
  return (
    <>
      <GlobalStyle />
      <Router>
        <Authenticated />
      </Router>
    </>
  )
}

export default App
//         <NotAuthenticated />
// import Authenticated from './Authenticated'
