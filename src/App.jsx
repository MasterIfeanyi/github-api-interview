import { useState } from 'react'
import './App.css'
import User from './components/User'
import { Routes, Route, Navigate } from 'react-router-dom'
import Repos from "./components/Repos"


function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<User />} />
        <Route path='/repos' element={<Repos username={username} userData={userData} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
