import { FC } from 'react'
import { Tab, TabList, TabPanel, useTabState } from 'ariakit/tab'
import { SignUp } from './SignUp'
import { SignIn } from './SignIn'
import styles from './Auth.module.scss'

type SignUpProps = {}

export const Auth: FC<SignUpProps> = () => {
  const tab = useTabState()

  return (
    <div className={styles.auth}>
      <TabList state={tab} className="tab-list" aria-label="Groceries">
        <Tab className="tab">SignUp</Tab>
        <Tab className="tab">SignIn</Tab>
      </TabList>
      <div className="panels">
        <TabPanel state={tab}>
          <SignUp />
        </TabPanel>
        <TabPanel state={tab}>
          <SignIn />
        </TabPanel>
      </div>
    </div>
  )
}
