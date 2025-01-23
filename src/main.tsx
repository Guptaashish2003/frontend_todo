import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import store from './store.ts'
import {createBrowserRouter,RouterProvider } from 'react-router-dom'
import Auth from './pages/Auth.tsx'

localStorage.setItem("isAuthenticated", "false")
const router = createBrowserRouter([ 
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/Home",
    element: <App />,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
