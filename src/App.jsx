import { useEffect, useState } from 'react'
import './App.css'
import Users from './components/users'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserPage from './components/userPage'


function App() {
  
  
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
    
    
    <Routes>
      <Route path="/" element={<Users/>} />
      <Route path='/profile/:id' element={<UserPage/>} />
      </Routes>
      
      
    </div>
  )
}

export default App
