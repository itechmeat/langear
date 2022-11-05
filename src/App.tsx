import { NhostClient, NhostReactProvider } from '@nhost/react'
import { Router } from '@/Router'

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_APP_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_APP_NHOST_REGION,
})

function App() {
  return (
    <div className="App">
      <NhostReactProvider nhost={nhost}>
        <Router />
      </NhostReactProvider>
    </div>
  )
}

export default App
