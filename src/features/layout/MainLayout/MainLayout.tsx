import { FC, PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/features/layout/Header/Header'
import styles from './MainLayout.module.scss'

type MainLayoutProps = {}

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>{!children ? <Outlet /> : children}</main>

      <footer className={styles.footer}>langear © 2023</footer>
    </div>
  )
}
