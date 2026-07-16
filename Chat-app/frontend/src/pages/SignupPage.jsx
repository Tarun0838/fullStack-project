import React, { useState } from 'react'
import {useAuthStore} from '../store/useAuthStore'
import { Lock, MailIcon, MessageCircleIcon, UserIcon } from 'lucide-react';
import { LoaderIcon } from 'react-hot-toast';
import { Link } from 'react-router';
const SignupPage = () => {

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  })

  const {signup , isSigningUp , userAuth} = useAuthStore();

  const submitHandler = (e) => {
    e.preventDefault()

    signup(formData)
  }


  return (
    <div className='w-full  flex items-center justify-center p-6 bg-slate-900'>
      <div
      className='relative w-full max-w-6xl md:h-[800px] h-[650px] bg-slate-800 rounded-2xl'
      >
        <div className=' w-full h-full flex flex-col md:flex-row'>

            {/* left side wala form banayenge  */}
            
            <div className='md:w-1/2 h-full p-8 flex items-center justify-center md:border-r border-slate-600/30 '>

                <div className='w-full max-w-md '>

                  {/* HEADING PART DONE  */}

                  <div className='text-center mb-8'>
                      <MessageCircleIcon  className='w-12 h-12 mx-auto text-slate-400 mb-4' />
                      <h1 className='text-slate-200 font-bold text-2xl mb-2' >Create Account</h1>
                      <p className='text-slate-400'>Sign up for new account</p>
                  </div>

                    {/* FORM PART START  */}

                    <form onSubmit={submitHandler} className='space-y-6'>
                          {/* full name input  */}

                      <div>
                        <label className='auth-input-label'>Full Name </label>
                        <div className='relative'>
                          <UserIcon className='auth-input-icon' />
                          <input
                          value={formData.fullname} 
                          onChange={(e)=> { setFormData({...formData, fullname: e.target.value}) }}
                          className='input'
                          placeholder='tarun yadav'
                          type="text" />
                        </div>
                      </div>

                          {/* email  input  */}

                      <div>
                        <label className='auth-input-label'>email </label>
                        <div className='relative'>
                          <MailIcon className='auth-input-icon' />
                          <input
                          value={formData.email} 
                          onChange={(e)=> { setFormData({...formData, email: e.target.value}) }}
                          className='input'
                          placeholder='tarunyadav@example.com'
                          type="email" />
                        </div>
                      </div>


                          {/* password  input  */}
                      <div>
                        <label className='auth-input-label'>Password </label>
                        <div className='relative'>
                          <Lock className='auth-input-icon' />
                          <input
                          value={formData.password} 
                          onChange={(e)=> { setFormData({...formData, password: e.target.value}) }}
                          className='input'
                          placeholder='password'
                          type="password" />
                        </div>
                      </div>

                      {/* SUBMIT BUTTON  */}
                      <button
                     type='submit'
                     className='auth-btn'
                     disabled={isSigningUp}
                      >
                        {
                          isSigningUp ? ( <LoaderIcon className='w-full h-5 mx-auto text-center animate-spin' />  ) : ("Create Account")
                        }

                      </button>

                    </form>

                    <div className='mt-5 text-center'>
                      <Link to={'/login'} className='auth-link'> Already have an account? login </Link>
                    </div>

                </div>
            </div>


            {/* form right side  */}
              <div
              className='hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent'
              >

                  <div>
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">Start Your Journey Today</h3>

                  <div className="mt-4 flex justify-center gap-4 text-lg text-white">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>

              </div>

        </div>

      </div>
      
    </div>
  )
}

export default SignupPage
