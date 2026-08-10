import React from 'react'
import axios from 'axios'
import { serverUrl } from '../App.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setProfileData, setUserData } from '../redux/userSlice.js'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import dp from '../assets/dp.jpg'
import Button from '../components/Button.jsx'
import Nav from '../components/Nav.jsx'

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { profileData, userData } = useSelector(state => state.user)
  // console.log("profile data", profileData)
  const handleProfile = async () => {
    try {
      // getProfile api ko call karenge

      const result = await axios.get(`${serverUrl}/api/user/getProfile/${username}`, { withCredentials: true });
      // console.log(result.data);
      dispatch(setProfileData(result.data));


    } catch (error) {
      console.error("error ", error.message);
    }
  }

  const handleLogout = async () => {
    try {
      // logout api call
      const res = await axios.post(`${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      dispatch(setUserData(null))
      console.log("left home ", res.data)
      toast.success("User Logout sucessfully!")
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.error("error", error.message)
    }
  }

  useEffect(() => {
    handleProfile();
  }, [username, dispatch])


  return (
    <div className='w-full min-h-screen bg-slate-900 p-4 '>

      {/* Header div (back btn username and logout feature) */}
      <div className='text-gray-100 flex items-center justify-between p-4'>
        <div
          onClick={() => { navigate('/') }}
          className='cursor-pointer'
        >
          <ArrowLeft className='w-10 h-10' />
        </div>
        <div>
          <h3 className='text-2xl' > {profileData?.username} </h3>
        </div>

        {/* logout button */}
        <div>
          <button
            className='cursor-pointer bg-indigo-700 text-2xl py-1.5 px-3.5 rounded-2xl'
            onClick={handleLogout}
          >Logout
          </button>
        </div>

      </div>

      {/* profile section  */}
      <div className='h-38 w-full flex items-start justify-center gap-7 md:gap-12 pt-6 px-6 '>
        {/* dp section  */}
        <div className=' w-12 h-12 md:w-38 md:h-38 rounded-full border-2 border-slate-800 cursor-pointer overflow-hidden '>
          <img
            className='w-full object-cover '
            src={profileData?.profileImage || dp}
            alt="profile picture" />
        </div>

        {/* name , bio , profession  */}
        <div className=''>
          <div className='text-gray-100 text-2xl font-semibold'> {profileData?.name} </div>
          <div className='text-gray-300 text-xl font-md'> {profileData?.profession || "New User"} </div>
          <div className='text-gray-300 text-xl font-md'> {profileData?.bio} </div>
        </div>


      </div>


      {/* post follower following section  */}
      <div className='w-full h-25 flex items-center justify-center gap-15 md:gap-30 pt-15 px-20 text-white '>
        {/* post  */}
        <div className='flex items-center justify-center gap-3'>
          <div className='text-2xl md:text-3xl font-semibold'> {profileData?.posts.length} </div>
          <div className='text-gray-300 text-xl'> <h4>posts</h4> </div>
        </div>
        {/* follower  */}
        <div className='flex items-center justify-center gap-3'>
          <div className='text-2xl md:text-3xl font-semibold'> {profileData?.followers.length} </div>
          <div className='text-gray-300 text-xl'> <h4>followers</h4> </div>
        </div>
        {/* following  */}
        <div className='flex items-center justify-center gap-3'>
          <div className='text-2xl md:text-3xl font-semibold'> {profileData?.following.length} </div>
          <div className='text-gray-300 text-xl'> <h4>following</h4> </div>
        </div>
      </div>

      {/* Edit profile button */}

      <div
        className='w-full h-20 flex  items-center justify-center gap-8 mt-6 '
      >
        {profileData?._id === userData?._id &&
         <Button btnName={"Edit Profile"} btnRoute={"editprofile"} />}

        {/* follow and message btn for non login user  */}

        {profileData?._id != userData?._id &&

          <>
            <Button btnName={"Follow"} />
            <Button btnName={"Message"} />
          </>

        }


      </div>


      {/* post section  */}

      <div className='w-full min-h-screen  flex items-center justify-center '>
        <div className='w-full min-h-screen max-w-255 bg-gray-100 mt-4 rounded-t-4xl  gap-8 flex items-center flex-col relative'>
          <Nav />
        </div>
      </div>


    </div>
  )
}

export default Profile
