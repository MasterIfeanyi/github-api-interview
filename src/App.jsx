import './App.css'
import User from './components/User'
import { Routes, Route, Navigate } from 'react-router-dom'
import Repos from "./components/Repos"
import { useAuth } from './context/AuthContext'
import Layout from './Layout/Layout'


function App() {

  const { username, userData } = useAuth()
  

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<User />} />
        <Route path='/repos' element={<Repos username={username} userData={userData} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
