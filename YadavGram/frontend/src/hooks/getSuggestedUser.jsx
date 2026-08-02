import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setSuggestedUser,  } from '../redux/userSlice'

import toast from 'react-hot-toast'

const getSuggestedUser = () => {
  

    const dispatch  = useDispatch();
    const {userData} = useSelector(state => state.user)
   useEffect(() => {

        const suggestedUser = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/user/suggested`,
                    {withCredentials: true}
                )
                dispatch(setSuggestedUser(res.data));
                // toast.success('feteched Suggested user Successfully')
                // console.log("suggested user : ", res.data)
            } catch (error) {
                console.log("error", error.message)
            }
        }

        suggestedUser();
   }, [userData])
   
  
}

export default getSuggestedUser
