import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ChatPage = () => {
  const {logout , isLoggingOut} = useAuthStore();
  return (
    <div>
      <h1>Chat page </h1>
      <button
      onClick={logout}
      className='bg-slate-800 rounded-lg p-6 text-gray-100 font-bold text-2xl mt-6'
      >Logout</button>
    </div>
  )
}

export default ChatPage
