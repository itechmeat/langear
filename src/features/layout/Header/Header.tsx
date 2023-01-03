import { FC, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuthenticationStatus, useSignOut, useUserData } from '@nhost/react'
import { Navigation } from '@/features/layout/Navigation/Navigation'
import { Button } from '@/ui/Button/Button'
import { Avatar } from '@/ui/Avatar/Avatar'
import styles from './Header.module.scss'

type HeaderProps = {}

export const Header: FC<HeaderProps> = () => {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuthenticationStatus()
  const userData = useUserData()
  const { signOut } = useSignOut()

  const handleSignOut = useCallback(() => {
    signOut()
    navigate('/')
  }, [])

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        langear
      </Link>

      {isAuthenticated && <Navigation />}

      <div className={styles.user}>
        {isAuthenticated ? (
          <div>
            <span className={styles.userName}>
              {userData?.displayName ? (
                <Avatar name={userData.displayName} size={32} legend={userData.displayName} />
              ) : null}
            </span>
            <Button outlined onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        ) : (
          <Button type="brand">Sign In</Button>
        )}
      </div>
    </header>
  )
}
