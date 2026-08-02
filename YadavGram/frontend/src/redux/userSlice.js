import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",

    initialState: {
        userData : null,
        suggestedUser : null
    },

    reducers: {
        // yah state parameter ke through hum userData state ko access kar sakte hai 
        // and action parameter ke through jo bhi data ayega usko userdata ke andar daal denge
        setUserData : (state, action) => {

            state.userData = action.payload;
        },

        setSuggestedUser : (state , action) => {
            state.suggestedUser = action.payload;
        }
    }
})


export const {setUserData, setSuggestedUser} = userSlice.actions
export default userSlice.reducer;