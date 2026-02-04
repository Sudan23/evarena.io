import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CompareProvider } from '@/hooks/useCompare'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CompareProvider>
      <App />
    </CompareProvider>
  </StrictMode>,
)
