import { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthenticationStatus } from '@nhost/react'

type ProtectedRouteProps = {
  children: ReactNode
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()
  const location = useLocation()

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <>{children}</>
}
