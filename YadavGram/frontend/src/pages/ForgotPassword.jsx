import axios from 'axios';
import { MailIcon } from 'lucide-react';
import  { useState } from 'react'
import { serverUrl } from '../App.jsx';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [loader, setLoader] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [inputclicked, setinputclicked] = useState({
        email: false,
        otp: false,
        newPassword: false,
        confirmPassword: false

    })

    // ab handleclick function banate hai usme apis ko call karenge
    const sendOtp = async () => {
        try {
            setLoader(true)
            // api call karunga
            const res = await axios.post(`${serverUrl}/api/auth/send-otp`,
              {email: formData.email},
                {withCredentials: true}
            )

            console.log(res.data);
            toast.success(res.data.message)
            setLoader(false)
            setStep(2)
        } catch (error) {
            console.log("error ", error) ; 
            toast.error(error.response.data.message)
             setLoader(false)
        }
    }

    // step 2 verify otp function to call otp 
    const verifyOtp = async () => {

        try {
            // api call karunga
            setLoader(true)
            const res = await axios.post(`${serverUrl}/api/auth/verify-otp`,
                {
                    email: formData.email,
                    otp: formData.otp
                },
                {withCredentials: true}
            )

            console.log(res.data);
            setLoader(false)
            setStep(3)
        } catch (error) {
            console.log("error ", error)
               setLoader(false)
        }
    }


    // step 3 reset password function
    const resetPassword = async () => {
         try {
            setLoader(true)
            // api call karunga

            // check newpassword and confirmpassword same hai ya nhi
            if(formData.newPassword !== formData.confirmPassword){
                throw new Error("new Password and confirm password must be same")
            }


            const res = await axios.post(`${serverUrl}/api/auth/reset-password`,
                {
                    email: formData.email,
                    password: formData.newPassword
                },
                {withCredentials: true}
            )

            console.log(res.data);
            setLoader(false)
        } catch (error) {
            console.log("error ", error.response.data)
            setLoader(false)
        }
    }

    return (
        <div className='w-full h-screen text-white flex flex-col items-center justify-center bg-linear-to-b from-black to-gray-800'>

                   {/* step 1 Send Otp  */} 
            {
                step == 1 && <div className=' w-[90%] lg:max-w-[60%] bg-white rounded-2xl flex-col h-162.5 flex items-center justify-center overflow-hidden border-2 gap-5 border-white'>
                    <h1
                        className='text-4xl font-semibold text-[#2f70cc] mt-5 mb-5'
                    >Forgot Password</h1>


                    {/* email input fields  */}

                    <div className='flex flex-col gap-1 '>
                        <label className='auth-input-label forgot-email-inp ' >Email </label>

                        <div className='relative -translate-y-2'>
                            <MailIcon className='auth-input-icon' />
                            <input
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className='input '
                                type="email"
                                placeholder='Enter your email'
                            />
                        </div>
                    </div>

                    {/* otp  input button  */}

                    <div className='flex text-slate-900 flex-col items-center justify-center'>
                        <button
                            disabled={loader}
                            onClick={sendOtp}
                            className='auth-btn'
                        >
                            {
                                loader ? <ClipLoader /> : "Send OTP"
                            }
                        </button>

                
                            
                    </div>

                </div>

                
                            

            }
                    {/* step - 2  enter Otp */}

            {
                step == 2 && <div className=' w-[90%] lg:max-w-[60%] bg-white rounded-2xl flex-col h-162.5 flex items-center justify-center overflow-hidden border-2 gap-5 border-white'>
                    <h1
                        className='text-4xl font-semibold text-[#2f70cc] mt-5 mb-5'
                    >Forgot Password</h1>


                    {/* email input fields  */}

                    <div className='flex flex-col gap-1 '>
                        <label className='auth-input-label forgot-email-inp ' >Enter OTP  </label>

                        <div className='relative -translate-y-2'>
                          
                            <input
                                value={formData.otp}
                                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                className='input '
                                type="number"
                                placeholder='Enter your otp'
                            />
                        </div>
                    </div>

                    {/* otp  input button  */}

                    <div className='flex text-slate-900 flex-col items-center justify-center'>
                        <button
                            disabled={loader}
                            onClick={verifyOtp}
                            className='auth-btn'
                        >
                            {
                                loader ? <ClipLoader /> : "Submit"
                            }
                        </button>

                
                            
                    </div>

                </div>
            }


                    {/* step 3 Reset password  */}
            {
                step == 3 && <div className=' w-[90%]  lg:max-w-[60%] bg-white rounded-2xl flex-col h-162.5 flex items-center justify-center overflow-hidden border-2 gap-5 border-white'>
                    <h1
                    className='text-4xl font-semibold text-[#2f70cc] mt-5 mb-5'
                    >Reset Password</h1>


                    {/* new password input fields  */}

                    <div className='flex flex-col gap-1 w-[90%] max-w-100 '>
                        <label className='auth-input-label new-password-label '
                         > New Password </label>

                        <div className='relative -translate-y-2'>
                          
                            <input
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                className='input '
                                type="password"
                                placeholder='Enter your new password'
                            />
                        </div>
                    </div>
                        {/* cofirm password input fild */}

                    <div className='flex flex-col gap-1 w-[90%] max-w-100 '>
                        <label className='auth-input-label new-password-label '
                         > Confirm Password </label>

                        <div className='relative -translate-y-2'>
                          
                            <input
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className='input '
                                type="text"
                                placeholder='Enter confirm password'
                            />
                        </div>
                    </div>

                    {/* otp  input button  */}

                    <div className='flex text-slate-900 flex-col items-center justify-center'>
                        <button
                            disabled={loader}
                            onClick={resetPassword}
                            className='auth-btn'
                        >
                            {
                                loader ? <ClipLoader /> : "Reset Password"
                            }
                        </button>

                
                            
                    </div>

                </div>
            }
        </div>
    )
}

export default ForgotPassword
