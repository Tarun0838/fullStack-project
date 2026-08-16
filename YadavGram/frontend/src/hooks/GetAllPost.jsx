import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { serverUrl } from '../App';

const GetAllPost = () => {

    // dispatch leke ayenge
    const dispatch = useDispatch();

    useEffect(() => {
      // yah api call hogi
      const fetchApi = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/post/getAll`, {withCredentials: true})
        } catch (error) {
            
        }
      }
    }, [dispatch])
    
}

export default GetAllPost
