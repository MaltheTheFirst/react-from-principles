import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { CatchProvider } from './context/CatchContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CatchProvider>
        <App />
      </CatchProvider>
    </BrowserRouter>
  </StrictMode>,
)
