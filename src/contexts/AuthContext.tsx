import { auth } from '../firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  User,
  updateEmail,
  updatePassword
} from 'firebase/auth'
import React, { useContext, ReactNode, useState, useEffect } from 'react'

interface AuthContextProviderProps {
  children: ReactNode
}

interface AuthContextType {
  currentUser: Record<string, any> | null
  signup: (email: string, password: string) => Promise<any>
  login: (email: string, password: string) => Promise<any>
  signOut: () => void
  resetPassword: (email: string) => void
}

export const AuthContext = React.createContext<AuthContextType>({
  currentUser: null,
  signup: async (email, password) => null,
  login: async (email, password) => null,
  signOut: () => {},
  resetPassword: (email: string) => {}
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const signup = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signOut = () => {
    return auth.signOut()
  }

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email)
  }

  const updateUserPassword = (newPassword: string) => {
    return currentUser && updatePassword(currentUser, newPassword)
    //  return currentUser && updateEmail(currentUser,email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    signOut,
    resetPassword
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
