import React from 'react'
import { authStore } from '../store/authStore'

const LoginPage = () => {
    const {authUser , isLoggedIn , login} =  authStore()
    // console.log("Auth user :", authUser )
    console.log("isLoggedIn :", isLoggedIn)
    // console.log(login())
    console.log(typeof login)
    
  return (
    <div>
      <h1>Login page </h1>
      <button
      className='btn btn-primary'
      onClick={()=> {
       console.log('button clicked')
        login()
      }}
      >Login</button>
    </div>
  )
}

export default LoginPage
