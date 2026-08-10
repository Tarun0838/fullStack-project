import { ArrowLeft } from 'lucide-react'
import React, { useRef, useState } from 'react'
import dp from '../assets/dp.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
import { serverUrl } from '../App'
import { setProfileData, setUserData } from '../redux/userSlice'
import toast from 'react-hot-toast'

const EditProfile = () => {
    const { userData, profileData } = useSelector(state => state.user)
    const navigate = useNavigate();
    const imageInput = useRef();
    const dispatch = useDispatch();
    const [frontendImage, setFrontendImage] = useState(userData?.profileImage || dp)
    const [backendImage, setBackendImage] = useState(null)

    const [loader, setLoader] = useState(false)

    const [formData, setFormData] = useState({
        name: userData.name,
        username: userData.username,
        bio: userData.bio || "",
        profession: userData.profession || "",
        gender: userData.gender || "",
        
    })




    console.log("frontend image : ", frontendImage)
    console.log("backend image : ", backendImage)



    const handleImage = (e) => {
        const file = e.target.files[0];
        if(!file){
            return;
        }
        setFrontendImage(URL.createObjectURL(file))
        setBackendImage(file)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {

            const formdata = new FormData()
            
            formdata.append("name", formData.name)
            formdata.append("username", formData.username)
            formdata.append("bio", formData.bio)
            formdata.append("profession", formData.profession)
            formdata.append("gender", formData.gender)
            
            if(backendImage){
                formdata.append("profileImage", backendImage)
            }
            setLoader(true)
            const res = await axios.post(`${serverUrl}/api/user/edit-profile`, formdata , {withCredentials: true})
            dispatch(setProfileData(res.data))
            dispatch(setUserData(res.data))
            toast.success("Changes Saved Successfully")
            setLoader(false)
            navigate(`/profile/${userData.username}`)


        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }

    return (
        <div className='w-full min-h-screen  bg-slate-900 text-gray-100 flex flex-col items-center  gap-4'>

            {/* header section back button  */}
            <div
                className='cursor-pointer w-full h-25 flex items-center gap-6 p-6 fixed left-3 '
            >
                <ArrowLeft
                    onClick={() => { navigate(`/profile/${userData.username}`) }}
                    className='w-10 h-10' />

                <div>
                    <h1 className='text-gray-100 text-3xl font-semibold '> Edit Profile</h1>
                </div>
            </div>

            {/* profile dp section  */}
            <div
                onClick={(() => { imageInput.current.click() })}
                className=' w-25 h-25 md:w-42 md:h-42 rounded-full border-2 border-slate-800 cursor-pointer overflow-hidden mt-20 '>
                <input

                    onChange={handleImage}
                    type="file" accept='image/*' ref={imageInput} hidden />
                <img
                    className='w-full object-cover '
                    src={frontendImage}
                    alt="profile picture" />
            </div>

            <div
                onClick={(() => { imageInput.current.click() })}
                className='text-indigo-600 text-2xl font-semibold cursor-pointer hover:underline hover:text-indigo-700'> Change Profile picture  </div>

            {/* inputs */}

            <form
            className='w-full flex flex-col items-center justify-center'
            onSubmit={submitHandler}
            
             >
                {/* name input  */}

                <div className='max-w-150 w-[90%] flex items-center justify-center mt-6'>
                    <input
                        className='w-[90%] max-w-150 h-20 bg-indigo-400/50 focus:border-violet-900 px-10 py-3 rounded-full text-2xl text-gray-200  outline-none'
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData , name:e.target.value})}
                        placeholder='Enter Name' />
                </div>
                
                {/* username input  */}

                <div className='max-w-150 w-[90%] flex items-center justify-center mt-6'>
                    <input
                        className='w-[90%] max-w-150 h-20 bg-indigo-400/50 focus:border-violet-900 px-10 py-3 rounded-full text-2xl text-gray-200  outline-none'
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData , username: e.target.value})}
                        placeholder='Enter username' />
                </div>

                {/* bio input  */}

                <div className='max-w-150 w-[90%] flex items-center justify-center mt-6'>
                    <input
                        className='w-[90%] max-w-150 h-20 bg-indigo-400/50 focus:border-violet-900 px-10 py-3 rounded-full text-2xl text-gray-200  outline-none'
                        type="text"
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData , bio: e.target.value})}
                        placeholder='Enter Bio' />
                </div>

                {/* profession input  */}

                <div className='max-w-150 w-[90%] flex items-center justify-center mt-6'>
                    <input
                        className='w-[90%] max-w-150 h-20 bg-indigo-400/50 focus:border-violet-900 px-10 py-3 rounded-full text-2xl text-gray-200  outline-none'
                        type="text"
                        value={formData.profession}
                        onChange={(e) => setFormData({...formData , profession: e.target.value})}
                        placeholder='Enter Profession' />
                </div>

                {/* gender input  */}

                <div className='max-w-150 w-[90%] flex items-center justify-center mt-6'>
                    <input
                        className='w-[90%] max-w-150 h-20 bg-indigo-400/50 focus:border-violet-900 px-10 py-3 rounded-full text-2xl text-gray-200  outline-none'
                        type="text"
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData , gender: e.target.value})}
                        placeholder='Enter Gender' />
                </div>

                {/* sumit button */}
                <div className='w-full max-w-60 mt-6 mb-10'>
                    <button
                    type='submit'
                    className="w-full bg-gray-200 text-slate-900 px-10 py-4 rounded-full text-2xl font-semibold
                    transition-all duration-300 ease-in-out
                    hover:scale-105 hover:bg-white
                    active:scale-95"
                    >
                      {loader ? <ClipLoader /> :  " Save Changes" }
                    </button>
                </div>
            </form>

        </div>
    )
}

export default EditProfile
