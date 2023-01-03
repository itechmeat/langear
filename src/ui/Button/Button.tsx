import { FC, PropsWithChildren, useCallback } from 'react'
import { Button as AriaButton } from 'ariakit/button'
import cn from 'classnames'
import styles from './Button.module.scss'
import { NavLink } from 'react-router-dom'

type ButtonTypeProps = {
  type?: 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'brand'
  outlined?: boolean
  to?: string
  iconStart?: string
  iconEnd?: string
  onClick?: () => void
}

export const Button: FC<PropsWithChildren<ButtonTypeProps>> = ({
  type = 'default',
  outlined,
  to,
  iconStart,
  iconEnd,
  children,
  onClick,
}) => {
  const classes = cn(styles.button, styles[type], {
    [styles.outlined]: outlined,
    [styles.iconOnly]: (iconStart || iconEnd) && !children,
    [styles.withStartIcon]: iconStart && children,
    [styles.withEndIcon]: iconEnd && children,
  })

  const Children = () => {
    return (
      <>
        {iconStart && (
          <span className={cn('material-symbols-outlined', styles.iconStart)}>{iconStart}</span>
        )}
        {children && <span className={styles.label}>{children}</span>}
        {iconEnd && (
          <span className={cn('material-symbols-outlined', styles.iconEnd)}>{iconEnd}</span>
        )}
      </>
    )
  }

  if (to) {
    return (
      <NavLink to={to} className={classes}>
        <Children />
      </NavLink>
    )
  }

  return (
    <AriaButton className={classes} onClick={onClick}>
      <Children />
    </AriaButton>
  )
}
