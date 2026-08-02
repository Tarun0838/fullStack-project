import React from 'react'
import { House, Plus } from 'lucide-react';
import { Play , Search} from 'lucide-react';
import dp from '../assets/dp.jpg'

const Nav = ({profileImage}) => {
    return (
        <div className='w-[90%] lg:w-[40%] bg-slate-900 h-20 rounded-full fixed bottom-4 flex items-center justify-around shadow-2xl shadow-slate-950 z-100 '>

            {/* work icons  */}

            {/* profile icon  */}
            <div className=' w-10 h-10 rounded-full border-2 border-slate-800 cursor-pointer overflow-hidden '>

                <img
                    className='w-full object-cover '
                    src={profileImage?.profileImage || dp}
                    alt="profile picture" />
            </div>

            {/* Home icon div */}
            <div>
                <House className='w-10 h-8' />
            </div>

            {/* reel icon  */}
            <div>
                <Play className='w-10 h-8' />
            </div>
            
            {/* search icon */}
            <div>
                 <Search className='w-10 h-8' />
            </div>

            {/* plus icon  */}
            <div>
                  <Plus className='w-10 h-8'  />
            </div>

        </div>
    )
}

export default Nav
