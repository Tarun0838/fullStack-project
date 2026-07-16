import { create } from 'zustand'
import axiosInstance from '../lib/axios'
import { data } from 'react-router';
import toast from 'react-hot-toast';

// now creating zustand store
export const useAuthStore = create((set) => ({
  // yah ab properties / state define karenge 
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,

  // creating a method for checking user is authenticated or not 
  checkAuth: async () => {
    // req send karenge /check par
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
      console.log("auth user: ", authUser)

    } catch (error) {
      console.log("Error in check auth : ", error);
      set({ authUser: null })

    }
    finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (data) => {
    // par user ko signup karane ke liye req send hogi /signup
    try {
      set({ isSigningUp: true })
      const res = await axiosInstance.post('/auth/signup', data)
      set({ authUser: res.data });
      toast.success('Account created successfully !')
    } catch (error) {
      console.log('error occur in signup authStore', error.message);
      toast.error(error.response.data.message)
    }
    finally {
      set({ isSigningUp: false })
    }
  }



}))