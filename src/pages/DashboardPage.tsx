import { FC } from 'react'
import { MainLayout } from '@/features/layout/MainLayout/MainLayout'

type DashboardPageType = {}

export const DashboardPage: FC<DashboardPageType> = () => {
  return (
    <MainLayout>
      <h1>Dashboard</h1>
    </MainLayout>
  )
}
