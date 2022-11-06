import { NhostClient, NhostReactProvider } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { Toaster } from 'react-hot-toast'
import { Router } from '@/Router'

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_APP_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_APP_NHOST_REGION,
})

function App() {
  return (
    <div className="App">
      <NhostReactProvider nhost={nhost}>
        <NhostApolloProvider nhost={nhost}>
          <>
            <Router />
            <Toaster />
          </>
        </NhostApolloProvider>
      </NhostReactProvider>
    </div>
  )
}

export default App
