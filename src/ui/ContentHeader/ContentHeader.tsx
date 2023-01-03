import { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import styles from './ContentHeader.module.scss'

type ContentHeaderType = {
  title: string
  level?: number
  backLink?: string
  children?: ReactNode
}

export const ContentHeader: FC<ContentHeaderType> = ({ title, level = 1, backLink, children }) => {
  return (
    <header className={cn(styles.header, styles[`headerLevel${level}`])}>
      {backLink && (
        <NavLink to={backLink} className={styles.back}>
          <span className={cn('material-symbols-outlined', styles.icon)}>arrow_circle_left</span>
        </NavLink>
      )}
      {level === 1 ? (
        <h1 className={styles.title}>{title}</h1>
      ) : (
        <h2 className={styles.title}>{title}</h2>
      )}
      {children && <div className={styles.actions}>{children}</div>}
    </header>
  )
}
