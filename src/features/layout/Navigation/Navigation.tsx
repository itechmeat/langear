import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import styles from './Navigation.module.scss'

type NavigationProps = {}

export const Navigation: FC<NavigationProps> = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        <li className={styles.item}>
          <NavLink
            to="/dashboard"
            className={navData => cn(styles.link, navData.isActive ? styles.active : '')}
          >
            Dashboard
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            to="/projects"
            className={navData => cn(styles.link, navData.isActive ? styles.active : '')}
          >
            Projects
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
