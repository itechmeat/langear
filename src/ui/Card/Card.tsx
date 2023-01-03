import { FC, PropsWithChildren, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import styles from './Card.module.scss'

type CardType = {
  title?: string
  to?: string
  actions?: ReactNode
  footer?: ReactNode
}

export const Card: FC<PropsWithChildren<CardType>> = ({ children, title, to, actions, footer }) => {
  return (
    <section className={cn(styles.card)}>
      <header className={styles.header}>
        {title && (
          <h4 className={styles.title}>
            {!to ? (
              title
            ) : (
              <NavLink to={to} className={styles.titleLink}>
                {title}
              </NavLink>
            )}
          </h4>
        )}
        {actions && <div className={styles.actions}>{actions}</div>}
      </header>
      <div className={styles.content}>{children}</div>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </section>
  )
}
