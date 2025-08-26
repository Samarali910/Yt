import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Formvalidation from './formvalidation.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>

    {/* <Formvalidation/> */}
    
  </StrictMode>,
)
