import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthenticationStatus } from '@nhost/react'
import { Auth } from '@/features/user/Auth/Auth'
import { MainLayout } from '@/features/layout/MainLayout/MainLayout'

type HomePageType = {}

export const HomePage: FC<HomePageType> = () => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  return (
    <MainLayout>
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
    </MainLayout>
  )
}
