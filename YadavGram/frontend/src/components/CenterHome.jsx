import { Heart } from 'lucide-react'
import React from 'react'

const CenterHome = () => {
  return (
    <div
      className='w-full lg:w-[50%] bg-slate-900 border border-slate-700 min-h-screen lg:h-screen relative overflow-y-auto text-gray-100 '
    >
      {/* CHOTI SCREEN KE LIYE LOGO AND NOTIFICATION ICON  */}

      <div className='w-full lg:hidden flex items-center justify-between  p-3'>
        <div>
          <h1
            className='text-2xl text-gray-100 bg-linear-to-r from-gray-800 to-slate-800 border-none p-1 rounded-sm font-semibold'
          >YadavGram</h1>
        </div>

        <div>
          <Heart size={25} color="#d6d6d6" strokeWidth={1.75} />
        </div>
      </div>

      {/* AB FEED WALA PART AYEGA */}

      

    </div>
  )
}

export default CenterHome
