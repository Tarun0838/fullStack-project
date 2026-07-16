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
  isLogginIn: false,
  isLoggingOut: false,

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
  },

  login : async(data) => {
    // login karne ke liye res send karenge and email and password send karenge
    try {
      set({isLogginIn: true})
      const res = await axiosInstance.post('/auth/login', data);
      set({authUser: res.data});
      // success notification 
      toast.success("Login user Successfully");
    } catch (error) {
      set({authUser: null});
      console.log('error occur in login authStore', error.message);
      toast.error(error.response.data.message);
    }
    finally{
      
      set({isLogginIn: false});
    }
  },

  logout: async() => {
   try {
    set({isLoggingOut:true})
     const res = await axiosInstance.post('/auth/logout');
     set({authUser: res.data})
     toast.success("Logout Successfully")
   } catch (error) {
    set({authUser: null})
    toast.error(error.response.data.message)
   }
   finally{
    set({isLoggingOut: false})
   }
  }


}))