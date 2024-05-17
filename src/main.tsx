import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './globals.css'
import Navbar from './components/Navbar.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='flex flex-col'>
      <Navbar />
      <App />
    </div>
  </React.StrictMode>,
)
