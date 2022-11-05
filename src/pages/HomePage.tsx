import { FC } from 'react'
import { Auth } from '@/features/user/Auth/Auth'
import { useAuthenticationStatus } from '@nhost/react'
import { NavLink } from 'react-router-dom'

type HomePageType = {}

export const HomePage: FC<HomePageType> = () => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  return (
    <div>
      <h1>Homepage</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : !isAuthenticated ? (
        <Auth />
      ) : (
        <div>
          <NavLink to="dashboard">Dashboard</NavLink>
        </div>
      )}
    </div>
  )
}
