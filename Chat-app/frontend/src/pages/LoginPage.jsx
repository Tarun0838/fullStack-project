import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const LoginPage = () => {
    
    // authStore use karnge
    const {authUser , isLoggedIn , login} = useAuthStore();
    console.log("auth user : ", authUser)

  return (
    <div>
      <h1>Login page </h1>
      <button
      onClick={login}
      className='btn btn-primary' 
      >Login</button>
    </div>
  )
}

export default LoginPage
