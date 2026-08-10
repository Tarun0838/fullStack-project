import React from 'react'
import dp from '../assets/dp.jpg'
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import toast from 'react-hot-toast';
import { setUserData } from '../redux/userSlice';
import OtherUser from './OtherUser';
const LeftHome = () => {
    const { userData , suggestedUser } = useSelector(state => state.user)
    const dispatch = useDispatch();
    // console.log(userData)
    // console.log(suggestedUser)

    const handleLogout = async () => {
        try {
            // logout api call
            const res = await axios.post(`${serverUrl}/api/auth/logout`,
                {},
                { withCredentials: true }
            )
            dispatch(setUserData(null))
            console.log("left home ", res.data)
            toast.success("User Logout sucessfully!")
        } catch (error) {
            toast.error(error.response.data.message)
            console.error("error", error.message)
        }
    }
    return (
        <div
            className=' w-[25%] bg-slate-900 min-h-screen hidden lg:block text-gray-100  border-gray-950  '
        >
            {/* logo & notification part  */}
            <div className='w-full flex items-center justify-between  p-3'>
                <div>
                    <h1
                        className='text-2xl text-gray-100 bg-linear-to-r from-gray-800 to-slate-800 border-none p-1 rounded-sm font-semibold'
                    >YadavGram</h1>
                </div>

                <div>
                    <Heart size={25} color="#d6d6d6" strokeWidth={1.75} />
                </div>
            </div>

            {/* profile pic username and logout part  */}
            <div
                className='flex items-center justify-between border-b border-slate-800 gap-3 pt-6 pb-6 py-3 px-3'>

                {/* profile db and user part  */}

                <div className='flex items-center gap-3'>
                    <div className=' w-12 h-12 rounded-full border-2 border-slate-800 cursor-pointer overflow-hidden '>

                        <img
                            className='w-full object-cover '
                            src={userData.profileImage || dp}
                            alt="profile picture" />
                    </div>

                    {/* name and username part  */}
                    <div className='text-white'>
                        <div>
                            <h2
                                className='text-gray-200'
                            > {userData.username}  </h2>
                        </div>
                        <div>
                            <h4
                                className='text-gray-400 text-sm'
                            >  {userData.name} </h4>
                        </div>
                    </div>
                </div>

                {/* logout button */}
                <div>
                    <button
                        className='cursor-pointer bg-indigo-700 py-1 px-3 rounded-2xl'
                        onClick={handleLogout}
                    >Logout
                    </button>
                </div>


            </div>

            {/* suggested user part  */}

            <div className='text-gray-200 pt-6 px-4 py-4 w-full flex flex-col gap-4' >
                <h1 className='text-xl font-medium'>Suggested Users </h1>
                 <div className='text-gray-200'>
                  {
                   suggestedUser &&  suggestedUser.slice(0, 10).map((user , index) => (
                        <OtherUser key={index} user= {user} /> 
                    ))
                  }
                 </div>
            </div>

        </div>
    )
}

export default LeftHome
