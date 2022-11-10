import { useAuth } from 'contexts/AuthContext'
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

type Props = {
  children?: React.ReactNode
}

const PrivateOutlet = ({ children }: Props) => {
  const { currentUser } = useAuth()
  const location = useLocation()
  return currentUser ? (
    <>
      {children}
      {/* The below is your nested route */}
      <Outlet />
    </>
  ) : (
    <Navigate to='/login' state={{ path: location.pathname }} />
  )
}

export default PrivateOutlet


