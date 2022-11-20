import { FC, ReactNode } from 'react'
import { Alert } from '@/ui/Alert/Alert'
import { Spinner } from '@/ui/Spinner/Spinner'
import styles from './ContentLoader.module.scss'

type ContentLoaderType = {
  children: ReactNode
  errorMessage?: string
  isLoading?: boolean
}

export const ContentLoader: FC<ContentLoaderType> = ({ children, errorMessage, isLoading }) => {
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className={styles.error}>
        <Alert type="error">{errorMessage}</Alert>
      </div>
    )
  }

  return <>{children}</>
}
