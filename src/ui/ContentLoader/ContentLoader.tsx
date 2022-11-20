import { FC, ReactNode } from 'react'
import { Alert } from '@/ui/Alert/Alert'
import { Spinner } from '@/ui/Spinner/Spinner'
import styles from './ContentLoader.module.scss'

type ContentLoaderType = {
  children: ReactNode
  error?: any
  isLoading?: boolean
}

export const ContentLoader: FC<ContentLoaderType> = ({ children, error, isLoading }) => {
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.error}>
        <Alert type="error">{error.message}</Alert>
      </div>
    )
  }

  return <>{children}</>
}
