import { FC, ReactNode } from 'react'
import { Header } from '@/features/layout/Header/Header'
import styles from './MainLayout.module.scss'

type MainLayoutProps = {
  children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>2022</footer>
    </div>
  )
}
