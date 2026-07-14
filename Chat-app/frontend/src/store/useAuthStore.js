import zustand from 'zustand'
import { isLoggedIn } from '../../../backend/src/middleware/auth.middleware'

// now creating zustand store
export const useAuthStore = zustand.create((set)=> ({
    // yah ab properties / state define karenge 

    authUser: {
        name: "Tarun Yadav", age: 20, skill: ["python",'c++','java']
    },
    isLoggedIn : false,
    login: ()=> {
        console.log('btn is clicked ')
        set({isLoggedIn: true})
    }
}))