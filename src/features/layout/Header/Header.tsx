import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from '@/features/layout/Navigation/Navigation'
import styles from './Header.module.scss'

type HeaderProps = {}

export const Header: FC<HeaderProps> = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        langear
      </Link>

      <Navigation />
    </header>
  )
}
