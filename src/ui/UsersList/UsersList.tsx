import { FC } from 'react'
import { Avatar } from '@/ui/Avatar/Avatar'
import { Member } from '@features/members/types'
import { Button } from '@/ui/Button/Button'
import styles from './UsersList.module.scss'

type UsersListType = {
  users: Member[]
  canDelete?: boolean
  onDelete?: (id: string) => void
}

export const UsersList: FC<UsersListType> = ({ users, canDelete, onDelete }) => {
  return (
    <ul className={styles.list}>
      {users.map(user => (
        <li className={styles.item} key={user.id}>
          <Avatar
            className={styles.avatar}
            name={user.user.displayName}
            // legend={user.legend}
            // photo={user.photo}
            size={32}
            key={user.id}
          />
          <span className={styles.name}>{user.user.displayName}</span>
          <span className={styles.role}>{user.role}</span>
          <span className={styles.space} />
          {canDelete && onDelete && (
            <Button type="danger" iconStart="delete" outlined onClick={() => onDelete(user.id)} />
          )}
        </li>
      ))}
    </ul>
  )
}
