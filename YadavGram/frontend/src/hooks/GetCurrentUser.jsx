import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const GetCurrentUser = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/user/current`,
                    { withCredentials: true }
                )
                dispatch(setUserData(res.data.loggedInUser));

            } catch (error) {
                console.error(`error : ${error.message}`)
            }
        }

        fetchUser();
    }, [])

}

export default GetCurrentUser
