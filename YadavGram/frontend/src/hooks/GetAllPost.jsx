import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { serverUrl } from '../App';
import { setPostData } from '../redux/postSlice';

const GetAllPost = () => {

    // dispatch leke ayenge
    const dispatch = useDispatch();

    useEffect(() => {
      // yah api call hogi
      const fetchAllPost = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/post/getAll`, {withCredentials: true})
            console.log(result.data);
            dispatch(setPostData(result.data))
        } catch (error) {
            console.log("Error getting all post data", error)
        }
      }


      fetchAllPost();
    }, [dispatch])
    
}

export default GetAllPost
