import {create} from 'zustand'
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

export const useChatStore = create((get , set)=> ({
    // yah sabse phele chats mai use hone wali state banayenge
    allContact: [],
    chats: [],
    messages: [],
    activeTab: 'chats',
    selectedUser: null,
    isUserLoading : false,
    isMessageLoading: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === true,


    // now ab method banayenge

    toggleSound : () => {
        localStorage.setItem('isSoundEnabled',!get().isSoundEnabled);
        set({isSoundEnabled: !get().isSoundEnabled})
    },

    setActiveTab: (tab) => {
        set({activeTab: tab})
    },

    setSelectedUser : (selectedUser) => {
        set({selectedUser: selectedUser})
    },

    getAllContact: async() => {

        try {
            set({isUserLoading: true});
          const res =   await axiosInstance.get('/message/contacts')
          set({allContact: res.data});
        } catch (error) {
           toast.error(error.response.data.message);

            
        }
        finally{
            set({isUserLoading: false})
        }
    },

    getChatUser : async() => {
        // yah basically /message/chats par req send karke chatuser ka data ayega

        try {
            set({isUserLoading: true});
            const res = await axiosInstance.get('/message/chats');
            set({chats: res.data})
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isUserLoading: false})
        }
    }


}))