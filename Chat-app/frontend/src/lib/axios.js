import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.NODE_ENV === 'developement'? "http://localhost:8000/api": "/api",
    withCredentials: true // set the cookie in the req
})

export default axiosInstance;