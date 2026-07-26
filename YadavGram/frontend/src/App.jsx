import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import {Toaster} from 'react-hot-toast'
import ForgotPassword from './pages/ForgotPassword'
export const serverUrl = 'http://localhost:8000'
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Signup/>} /> 
      <Route path='/login' element={<Login/>} /> 
      <Route path='/signup' element={<Signup/>} /> 
      <Route path='/forgot-password' element={<ForgotPassword/>} /> 




    </Routes>
      <Toaster />
    </>
    

     
  )
}

export default App
