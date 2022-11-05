import { FC, ReactNode } from 'react'
import { Header } from '@/features/layout/Header/Header'
import styles from './MainLayout.module.scss'
import { Outlet } from 'react-router-dom'

type MainLayoutProps = {}

export const MainLayout: FC<MainLayoutProps> = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>2022</footer>
    </div>
  )
}
