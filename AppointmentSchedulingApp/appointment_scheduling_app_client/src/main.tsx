import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PatientApp from './PatientApp.tsx'
import ReceptionistApp from './ReceptionistApp.tsx'
import { useState } from 'react'

const App = () => {
  const [userRole, setUserRole] = useState('patient')

  return (
    <StrictMode>
      {userRole === 'patient' ? <PatientApp /> : <ReceptionistApp />}
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
