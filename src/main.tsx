import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import store from './store.ts'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Auth from './pages/Auth.tsx'

localStorage.setItem("isAuthenticated", "false")

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>

      <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<App />} />
        <Route path="/" element={<Auth />} />
      </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
