import React, { useState } from 'react'

export const AuthContext = React.createContext([false, () => {}])

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(false)

  return <AuthContext.Provider value={[state, setState]}>{children}</AuthContext.Provider>
}
