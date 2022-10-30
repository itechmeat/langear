import { FC } from 'react'
import { MainLayout } from '@/features/layout/MainLayout/MainLayout'

type HomePageType = {}

export const HomePage: FC<HomePageType> = () => {
  return (
    <MainLayout>
      <h1>Homepage</h1>
    </MainLayout>
  )
}
