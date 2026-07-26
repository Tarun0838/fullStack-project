import React, { useState } from 'react'
import { Lock, LockIcon, MailIcon, MessageCircleIcon, UserIcon, Eye, EyeOff } from 'lucide-react';
import axios from 'axios'
import { serverUrl } from '../App';
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  let [showPassword, setShowPassword] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

  }


  const loginHandler = async () => {
    setLoader(true)
    try {
      const res = await axios.post(`${serverUrl}/api/auth/login`,
        formData,
        { withCredentials: true })
        toast.success(` User LoggedIn Successfully!`)
      console.log(res.data);
      setLoader(false)

    } catch (error) {
      toast.error(error.response.data.message)
      console.log('error ', error.message)
      setLoader(false)
    }
  }

  return (
    <div className='w-full h-screen text-white flex flex-col items-center justify-center bg-linear-to-b from-black to-gray-800'>
      <div className=' w-[90%] lg:max-w-[60%] bg-white rounded-2xl h-162.5 flex items-center justify-center overflow-hidden border-2 border-white '>
        {/* ab iske andar 2 div banenge  */}
        <div className='w-full  md:w-1/2 h-full bg-white flex flex-col gap-5 p-2 items-center justify-center flex-start '>
          {/* HEADER PART  */}
          <div className='flex items-center text-black mt-10 gap-3 '>
            <span className='text-2xl font-semibold text-blue-800  '>Login  to </span>
            <h1 className='text-4xl font-bold font-sans shadow-4xl shadow-gray-200 '>YadavGram</h1>
          </div>

          {/* INPUT PART  */}

          <form
            onSubmit={submitHandler}
            className='space-y-6'>



            {/* USERNAME PART  */}
            <div >
              <label className='auth-input-label' >Username </label>

              <div className='relative -translate-y-2'>
                <UserIcon className='auth-input-icon' />
                <input
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className='input '
                  type="text"
                  placeholder='Enter your username'
                />
              </div>
            </div>


            {/* password PART  */}
            <div className=' '>
              <label className='auth-input-label' >Password </label>

              <div className='relative -translate-y-2 flex flex-col items-center justify-center'>
                <LockIcon className='auth-input-icon' />
                <input
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className='input '
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter your password'
                />
                {
                  !showPassword ? <Eye
                    onClick={() => setShowPassword(true)}
                    className='show-password-icon'
                    size={28} color="#c0c0c0" strokeWidth={1.75} />
                    : <EyeOff
                      onClick={() => setShowPassword(false)}
                      className='show-password-icon'
                      size={28} color="#c0c0c0" strokeWidth={1.75} />
                }

              </div>

            </div>
            <div className='flex items-start text-slate-800 text-xl cursor-pointer '>
              <h2
              onClick={()=> navigate('/forgot-password')}
              >Forgot Password?</h2>
            </div>

            {/* signUp button part  */}

            <div className='flex text-slate-900 flex-col items-center justify-center'>
              <button
                disabled={loader}
                onClick={loginHandler}
                className='auth-btn'
              >
                {
                  loader ? <ClipLoader /> : "Login"
                }
              </button>

              <p
                onClick={() => navigate('/signup')}
                className='text-lg  cursor-pointer  font-medium '
              > Don't have an account?
                <span
                  onClick={() => navigate('/signup')}
                  className='text-2xl font-semibold ml-2 cursor-pointer '
                >Sign Up</span> </p>
            </div>

          </form>



        </div>



        <div className='md:w-1/2 h-full lg:flex hidden justify-center items-center flex-col  text-white text-[16px] font-semibold  rounded-l-[30px] bg-[#000000] shadow-3xl shadow-black'>
          <div className='flex flex-col items-center justify-center gap-20 relative'>
            {/* <div className='p-4 flex items-center  gap-4 flex-col mt-6 '>
              <h1 className='text-2xl text-amber-500 font-bold pt-4'>WELCOME TO YADAVGRAM</h1>
             
            </div> */}
            <img 
                        className='w-50'
                        src='/signup1.svg' alt="signup image" />

            <img
              className='w-full'
              src="/signup2.svg" alt="signup Page" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
