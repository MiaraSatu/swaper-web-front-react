import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faWarning, faPowerOff, faEnvelope, faUsers, faUserPlus, faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faTwitter, faWarning, faPowerOff, faEnvelope, faUsers, faUserPlus, faHeart)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
