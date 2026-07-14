import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

function SignupPage() {
    // useState hook : yah se mere ko form ka data milega
    console.log("signup page render")
    const [formData, setFormData] = useState({fullname:"",email:"",password:""})

    // ab iss data ko backend mai bhejna hai uske liye use karenge zustand ka 
    const {signup , isSigningUp} = useAuthStore();

  return (
   <div className='w-full flex items-center justify-center p-4 bg-slate-900 '>
    <div className='relative w-full max-w-6xl md:h-[800px] h-[650px] border border-indigo-800 '>
        <h1>hello signup</h1>
    </div>
   </div>
  )
}

export default SignupPage
