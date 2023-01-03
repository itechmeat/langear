import { CSSProperties, FC } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import styles from './Avatar.module.scss'

type AvatarType = {
  name: string
  className?: string
  legend?: string
  photo?: string
  size?: number
  to?: string
  status?: 'online' | 'offline'
}

export const Avatar: FC<AvatarType> = ({
  name,
  className,
  legend,
  size,
  photo,
  to,
  status = 'offline',
}) => {
  let style = {}

  if (size) {
    style = {
      '--ui-avatar-size': `${size}px`,
    } as CSSProperties
  }

  return (
    <span className={cn(styles.avatar, styles[status], className)} title={legend} style={style}>
      <span className={styles.initials}>
        {name
          .split(' ')
          .map((item, index) => (index < 2 ? item[0] : null))
          .join('')
          .toUpperCase()}
      </span>
    </span>
  )
}
