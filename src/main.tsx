import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import './i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense
      fallback={
        <div role="status" aria-live="polite" className="p-6 text-center text-dk-ink">
          Loading translations…
        </div>
      }
    >
      <App />
      <Toaster position="top-right" />
    </Suspense>
  </StrictMode>,
)
