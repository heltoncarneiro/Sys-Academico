import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const saved = localStorage.getItem('sa_auth')
    if(saved){
      try{ const parsed = JSON.parse(saved); setIsAuthenticated(true); setUser(parsed) }catch{}
    }
  },[])

  const login = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    localStorage.setItem('sa_auth', JSON.stringify(userData || { ok:true }))
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('sa_auth')
  }

  const value = useMemo(()=>({ isAuthenticated, user, login, logout }), [isAuthenticated, user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
  const ctx = useContext(AuthContext)
  if(!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}