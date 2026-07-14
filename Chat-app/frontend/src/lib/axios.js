import axios from 'axios'

const axiosInstance = axios.create({
    
    baseURL: "http://localhost:8000/api",
    withCredentials: true // set the cookie in the req
})

export default axiosInstance;