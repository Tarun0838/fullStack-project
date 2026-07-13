import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: Meta.env.NODE_ENV === 'developement'? "http://localhost:800/api": "/api",
    withCredentials: true // set the cookie in the req
})

export default axiosInstance;