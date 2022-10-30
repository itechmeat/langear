import { FC } from 'react'
import { MainLayout } from '@/features/layout/MainLayout/MainLayout'

type NotFoundPageType = {}

export const NotFoundPage: FC<NotFoundPageType> = () => {
  return (
    <MainLayout>
      <h1>404</h1>
    </MainLayout>
  )
}
