import {create} from 'zustand'
import axiosInstance from '../lib/axios'
import { data } from 'react-router';
import toast from 'react-hot-toast';

// now creating zustand store
export const useAuthStore = create((set) => ({
    // yah ab properties / state define karenge 
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            console.log('/check se data agaya');
            console.log(res.data)
            console.log(axiosInstance.defaults.baseURL);
            set({ authUser: res.data })
        } catch (error) {
            console.log("error occur in useAuthStore ", error)
            set({ authUser: null })
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        // yah basically hume api call karni hai
        try {
            set({isSigningUp: true})
            const res = await axiosInstance.post("/auth/signup", data);
            console.log(res.data);
            set({authUser: res.data});

            // now sending the success message by taoster
            toast.success("Account Created Successfully!")
        } catch (error) {
            console.log('error occur in signup useAuthStore',error);
            toast.error(error.response.data.message)
            
        }
        finally{
            set({isSigningUp: false})
        }
    }


}))