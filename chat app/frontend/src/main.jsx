import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
 import {BrowserRouter} from 'react-router-dom'
 import { SocketcontextProvider } from './context/Socketcontext.jsx'
import {AuthContextProvider}  from './context/Authcontext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <SocketcontextProvider>
    <App />
      </SocketcontextProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
