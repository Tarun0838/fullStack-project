import { create } from "zustand";


export const authStore = create((set) => {
   return {
    /**
     * ye authStore method basicaly auth state ko store kartahai object ke form mai and return bhi object hi kartahai 
     */
     authUser : {
        name : "Tarun yadav",
        post: "Full-Stack Developer",
        age: 20
    },
    
    isLoading: false,
    isLoggedIn: false,
    login: ()=> {
        console.log("You are logged In  ")
        set({isLoggedIn: true})
       
    }
   }


})