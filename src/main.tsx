import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'

const router = createBrowserRouter([
  {
    path: "/",
    element: <StrictMode><App /></StrictMode>,
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
