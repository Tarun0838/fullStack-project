import React from 'react'
import { useSelector } from 'react-redux'
import dp from '../assets/dp.jpg'
import { useNavigate } from 'react-router-dom'

const OtherUser = ({user}) => {
    const navigate = useNavigate();
    const {userData} = useSelector(state => state.user)
    return (
        <div
            className='flex items-center justify-between gap-3 p-3'>

            {/* profile db and user part  */}

            <div className='flex items-center gap-3'>
                <div 
                onClick={() => { navigate(`/profile/${user.username}`) }}
                className=' w-12 h-12 rounded-full border-2 border-slate-800 cursor-pointer overflow-hidden '>

                    <img
                        className='w-full object-cover '
                        src={user.profileImage || dp}
                        alt="profile picture" />
                </div>

                {/* name and username part  */}
                <div className='text-white'>
                    <div>
                        <h2
                            className='text-gray-200'
                        > {user.username}  </h2>
                    </div>
                    <div>
                        <h4
                            className='text-gray-400 text-sm'
                        >  {user.name} </h4>
                    </div>
                </div>
            </div>

            {/* follow button */}
            <div>
                <button
                    className='cursor-pointer bg-indigo-700 py-1 px-3 rounded-2xl'
                   
                >follow
                </button>
            </div>


        </div>
    )
}

export default OtherUser
