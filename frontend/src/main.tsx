import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import '../chatbot/chat.css'
import App from './App'

console.log(
  '%c> BYTE.EXE loaded. Try the Konami Code.',
  'color: #4ade80; font-family: monospace; font-size: 12px;'
)

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element not found')

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
