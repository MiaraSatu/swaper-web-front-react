import { createContext, useContext, useEffect, useState } from "react";

const TTL = 3600;

const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  user: null,
  login: () => {},
  logout: () => {}
})

const AuthContextProvider = ({children}) => {
  const [isAuthenticated, setAuthenticated] = useState(false)

  const isTokenExpired = () => {
    const tokenJson = localStorage.getItem("token")
    if(tokenJson) {
      const now = new Date().getTime()
      const token = JSON.parse(tokenJson)
      return now > token.expiredAt
    }
    return true
  }

  const login = (token, user) => {
    const now = new Date();
    const expiration = now.getTime() + TTL *1000;
    if(token && user) {
      setAuthenticated(true)
      localStorage.setItem('token', JSON.stringify({value: token, expiredAt: expiration}))
      localStorage.setItem('user', JSON.stringify(user))
    }
  }

  const logout = () => {
    setAuthenticated(false)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  useEffect(() => {
    const autoCleanInterval = setInterval(() => {
      if(isTokenExpired()) {
        logout()
      }
    }, 5000)

    // verify the token validity
    if(isTokenExpired()) {
      logout()
    } else {
      setAuthenticated(true)
    }

    return clearInterval(autoCleanInterval)
  }, [])

  const tokenObject = JSON.parse(localStorage.getItem('token'))
  const token = tokenObject ? tokenObject.value : null
  const user = JSON.parse(localStorage.getItem('user'))

  return <AuthContext.Provider value={{
    isAuthenticated, 
    token, 
    user, 
    login, 
    logout}
  }>
    {children}
  </AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export {useAuth, AuthContextProvider}