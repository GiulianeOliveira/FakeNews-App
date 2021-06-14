import React from 'react'

export const userContext = React.createContext({ login: false, type: 'comum' })
export const useUser = () => React.useContext(userContext)
