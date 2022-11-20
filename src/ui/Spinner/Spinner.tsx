import { FC } from 'react'
import styles from './Spinner.module.scss'

type SpinnerType = {}

export const Spinner: FC<SpinnerType> = () => {
  return <div className={styles.spinner} />
}
