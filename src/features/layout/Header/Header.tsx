import { FC, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Button } from 'ariakit/button'
import { useAuthenticationStatus, useSignOut, useUserData } from '@nhost/react'
import { Navigation } from '@/features/layout/Navigation/Navigation'
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
            <span style={{ marginRight: 20 }}>{userData?.displayName}</span>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </div>
        ) : (
          <button>Sign In</button>
        )}
      </div>
    </header>
  )
}
