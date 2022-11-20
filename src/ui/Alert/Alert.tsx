import { FC, ReactNode } from 'react'
import cn from 'classnames'
import styles from './Alert.module.scss'

enum AlertTypes {
  error = 'error',
  warning = 'warning',
  success = 'success',
  neural = 'neural',
}

const icons = {
  [AlertTypes.error]: 'error',
  [AlertTypes.warning]: 'warning',
  [AlertTypes.success]: 'new_releases',
  [AlertTypes.neural]: 'assignment_late',
}

type AlertType = {
  children: ReactNode
  type?: `${AlertTypes}`
  title?: string
}

export const Alert: FC<AlertType> = ({ children, type = AlertTypes.neural, title }) => {
  return (
    <div className={cn(styles.alert, styles[type + '-alert'])}>
      <div className={styles.pic}>
        <span className={cn('material-symbols-outlined', styles.icon)}>{icons[type]}</span>
      </div>
      <div className={styles.content}>
        {!!title && <h4 className={styles.title}>{title}</h4>}
        {children}
      </div>
    </div>
  )
}
