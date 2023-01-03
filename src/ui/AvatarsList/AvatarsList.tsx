import { ComponentProps, FC, PropsWithChildren } from 'react'
import { Avatar } from '@/ui/Avatar/Avatar'
import styles from './AvatarsList.module.scss'

type AvatarsListType = {
  items: {
    id: string
    name: string
    legend?: string
    photo?: string
    status?: ComponentProps<typeof Avatar>['status']
  }[]
  size?: number
  limit?: number
}

export const AvatarsList: FC<PropsWithChildren<AvatarsListType>> = ({ items, size, limit }) => {
  return (
    <div className={styles.avatars}>
      {items.map(item => (
        <Avatar
          className={styles.avatar}
          name={item.name}
          legend={item.legend}
          photo={item.photo}
          size={size}
          key={item.id}
        />
      ))}
    </div>
  )
}
