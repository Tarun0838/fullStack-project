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
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Upload from './pages/Upload'
import GetAllPost from './hooks/GetAllPost'
export const serverUrl = 'http://localhost:8000'
const App = () => {

  // these are the custom hooks 
  GetCurrentUser();
  getSuggestedUser();
  GetAllPost();
  const {userData} = useSelector(state => state.user)


  return (
    <>
    <Routes>
      <Route path='/' element={userData? <Home/> : <Navigate to={'/login'} /> } /> 
      <Route path='/login' element={ !userData?<Login/> :  <Navigate to={'/'} /> } /> 
      <Route path='/signup' element={ !userData?  <Signup/> : <Navigate to={'/'} /> } /> 
      <Route path='/forgot-password' element={!userData? <ForgotPassword/> : <Navigate to={'/'} /> } /> 
      <Route path={`/profile/:username`} element={userData ? <Profile /> : <Navigate to={'/login'} /> } />
      <Route path={'/editprofile'} element={userData? <EditProfile /> : <Navigate to={'/login'} /> } /> 
      <Route path={'/upload'} element={userData? <Upload /> : <Navigate to={'/login'} /> } /> 



    </Routes>
      <Toaster />
    </>
    

     
  )
}

export default App
