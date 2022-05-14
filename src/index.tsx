import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Auth0Provider } from '@auth0/auth0-react'
import { StateProvider } from './Store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <Auth0Provider
    domain='myjobplanner.eu.auth0.com'
    clientId='VDyAPJ6AmCTn53b6JavY2fayp72sZ1Lt'
    redirectUri={window.location.origin}
    audience='https://api.myjobplanner.com'
    scope='openid email create:business read:business'
  >
    <StateProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StateProvider>
  </Auth0Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
