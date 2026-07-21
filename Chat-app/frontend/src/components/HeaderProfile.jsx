import { useState, useRef } from 'react'
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'

const HeaderProfile = () => {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => { }

  return (
    <div className=' border-b border-slate-700/50 p-6 '>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          {/* profie photo  */}
          <div className='avatar online '>

            <button
              onClick={() => fileInputRef.current.click()}
              className='size-14 rounded-full overflow-hidden relative group'>
              <img
                className='size-full object-cover'
                src={selectedImg  || '/avatar.png'} alt="profile pic" />
                <div className='absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity bg-black/50'>
                  <span className='text-white text-xs'>change</span>
                </div>
            </button>



            <input type="file"
              accept='image/*'
              ref={fileInputRef}
              onChange={handleImageUpload}
              className='hidden'
            />

          </div>

        </div>
      </div>

    </div>
  )
}

export default HeaderProfile
