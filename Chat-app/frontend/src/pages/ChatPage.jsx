import React from 'react'
import { useChatStore } from '../store/useChatStore'
import HeaderProfile from '../components/HeaderProfile';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatList from '../components/ChatList';
import ContactList from '../components/ContactList';
import ChatContainer from '../components/ChatContainer';
import NoConversatinPlaceHolder from '../components/NoConversatinPlaceHolder';

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className=' relative w-full  max-w-7xl md:h-[800px] h-[650px] border rounded-lg flex md:flex-row '>

      {/* LEFT PART  */}
      <div className='w-[400px] text-white h-full bg-slate-800/50 backdrop-blur-sm  flex flex-col ' >
        {/* ab 3 componet render karenge  */}
        <HeaderProfile />
        <ActiveTabSwitch />

        <div className='flex flex-col overflow-y-auto space-y-2'>

          {activeTab === 'chats' ? <ChatList /> : <ContactList />}
        </div>


      </div>

       {/* RIGHT PART  */}
       <div className='flex-1 text-white flex flex-col md:flex-row bg-slate-900/50 backdrop-blur-sm'>
        {selectedUser? <ChatContainer/> : <NoConversatinPlaceHolder />}
       </div>

    </div>
  )
}

export default ChatPage
