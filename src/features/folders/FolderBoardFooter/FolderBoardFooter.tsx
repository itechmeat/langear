import { FC, ReactNode } from 'react'
import styles from './FolderBoardFooter.module.scss'

type FolderBoardFooterType = {
  children: ReactNode
}

export const FolderBoardFooter: FC<FolderBoardFooterType> = ({ children }) => {
  return <footer className={styles.footer}>{children}</footer>
}
