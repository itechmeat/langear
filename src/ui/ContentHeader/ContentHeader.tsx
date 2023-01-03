import { FC, ReactNode } from 'react'
import styles from './ContentHeader.module.scss'

type ContentHeaderType = {
  title: string
  level?: number
  children?: ReactNode
}

export const ContentHeader: FC<ContentHeaderType> = ({ title, level = 1, children }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </header>
  )
}
