import React from 'react'
import dp from '../assets/dp.jpg'

const StoryDp = ({ profileImage, username }) => {
    return (
        <div className='w-16 '>
            <div className='w-15 h-15 flex items-center justify-center bg-linear-to-b from-indigo-500 to-indigo-800 rounded-full overflow-auto '>
                <div className=' w-12 h-12 rounded-full border-2 border-slate-800 cursor-pointer overflow-hidden '>

                    <img
                        className='w-full object-cover '
                        src={profileImage?.profileImage || dp}
                        alt="profile picture" />
                </div>


            </div>
            <div>
                <h2 className='text-gray-200 text-center truncate w-full' > {username} </h2>
            </div>
        </div>
    )
}

export default StoryDp
