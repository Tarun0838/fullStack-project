import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",

    initialState: {
        userData : null,
        suggestedUser : null,
        profileData: null,
        followCount: 0,
        followingCount: 0
    },

    reducers: {
        // yah state parameter ke through hum userData state ko access kar sakte hai 
        // and action parameter ke through jo bhi data ayega usko userdata ke andar daal denge
        setUserData : (state, action) => {

            state.userData = action.payload;
        },

        setSuggestedUser : (state , action) => {
            state.suggestedUser = action.payload;
        },

        setProfileData : (state, action) => {
            state.profileData = action.payload;
        },

        setFollowCount: (state , action ) => {
            state.followCount = action.payload
        },
        setFollowingCount: (state , action ) => {
            state.followingCount = action.payload
        },
    }
})


export const {setUserData, setSuggestedUser, setProfileData} = userSlice.actions
export default userSlice.reducer;