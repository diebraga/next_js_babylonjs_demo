import { destroyCookie } from "nookies";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import Router from 'next/router'

type CurrentUser = {
  id: string
  email?: string
  name?: string
}

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextData = {
  currentUser: CurrentUser
  setCurrentUser: Dispatch<SetStateAction<CurrentUser>>
  signOut: () => void
  users: CurrentUser[]
  setUsers: Dispatch<SetStateAction<CurrentUser[]>>
  searchName: string
  setSearchName: Dispatch<SetStateAction<string>>
  isAuthenticated: boolean
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps){
  const [currentUser, setCurrentUser] = useState({} as CurrentUser)
  const [users, setUsers] = useState<CurrentUser[]>([])
  const [searchName, setSearchName] = useState('')
  let isAuthenticated = !!currentUser

  function signOut() {
    destroyCookie(null, 'jwt')
    Router.push('/signin')
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser,
      signOut,
      users, 
      setUsers,
      searchName,
      setSearchName,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)