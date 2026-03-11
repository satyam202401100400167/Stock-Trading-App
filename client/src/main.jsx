import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GeneralProvider } from './context/GeneralContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GeneralProvider>
        <App />
      </GeneralProvider>
    </BrowserRouter>
  </StrictMode>,
)
