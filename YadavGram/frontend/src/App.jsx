import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import {Toaster} from 'react-hot-toast'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import GetCurrentUser from './hooks/GetCurrentUser'
import getSuggestedUser from './hooks/getSuggestedUser'
export const serverUrl = 'http://localhost:8000'
const App = () => {
  GetCurrentUser();
  getSuggestedUser();
  const {userData} = useSelector(state => state.user)


  return (
    <>
    <Routes>
      <Route path='/' element={userData? <Home/> : <Navigate to={'/login'} /> } /> 
      <Route path='/login' element={ !userData?<Login/> :  <Navigate to={'/'} /> } /> 
      <Route path='/signup' element={ !userData?  <Signup/> : <Navigate to={'/'} /> } /> 
      <Route path='/forgot-password' element={!userData? <ForgotPassword/> : <Navigate to={'/'} /> } /> 




    </Routes>
      <Toaster />
    </>
    

     
  )
}

export default App
