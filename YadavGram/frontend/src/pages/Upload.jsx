import axios from 'axios';
import { ArrowLeft, Plus } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setPostData } from '../redux/postSlice';
import { setStoryData } from '../redux/storySlice';
import { setReelData } from '../redux/reelSlice';

const Upload = () => {

    const navigate = useNavigate();
    const [uploadType, setUploadType] = useState("post")
    const [frontendMedia, setfrontendMedia] = useState(null)
    const [backendMedia, setbackendMedia] = useState(null)
    const [mediaType, setmediaType] = useState("")
    const [caption, setCaption] = useState("")
    const [loading, setloading] = useState(false)

    const dispatch = useDispatch();
    const {postData} = useSelector(state => state.post)
    const {storyData} = useSelector(state => state.story)
    const {reelData} = useSelector(state => state.reel)
    console.log(postData , storyData, reelData)
    const mediaInput = useRef()

    const handleMedia = (e) => {
        try {
            // get the file jo upload hui hai
            const file = e.target.files[0]

            if (!file) {
                return;
            }
            console.log(file)

            // getting media type
            let type = ""
            if (file.type.includes("image")) {
                type = "image"
            }
            else if (file.type.includes("video")) {
                type = "video"
            }
            else {
                console.log('unsuported file')
                return;
            }

            const frontendUrl = URL.createObjectURL(file);

            // Set states
            setmediaType(type);
            setbackendMedia(file);
            setfrontendMedia(frontendUrl);

            // Direct values log karo
            // console.log("Media type:", type);
            // console.log("Frontend URL:", frontendUrl);
            // console.log("Backend media:", file);
            // console.log("caption:", caption);

        } catch (error) {
            console.error("error in handle media upload.jsx ", error.message)
        }
    }

    const uploadPost = async () => {
        try {
            // creating formData
            setloading(true)
            const formData = new FormData();
            formData.append("caption", caption)
            formData.append("mediaType", mediaType)
            formData.append("media", backendMedia)

            const result = await axios.post(`${serverUrl}/api/post/upload`, formData, { withCredentials: true })
            setloading(false)
            dispatch(setPostData([...postData , result.data]))
            toast.success(` Post uploaded Successfully!`)
            console.log(result)
            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setloading(false)
        }
    }
    const uploadStory = async () => {
        try {
            // creating formData
            setloading(true)
            const formData = new FormData();
            formData.append("mediaType", mediaType)
            formData.append("media", backendMedia)

            const result = await axios.post(`${serverUrl}/api/story/upload`, formData, { withCredentials: true })

            console.log(result)
            setloading(false)
            toast.success(` Story Uploaded Successfully!`)
             dispatch(setStoryData([...storyData , result.data]))
             navigate('/')
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setloading(false)
        }
    }

    const uploadReel = async () => {
        try {
            // creating formData
            setloading(true)
            const formData = new FormData();
            formData.append("caption", caption)
            formData.append("mediaType", mediaType)
            formData.append("media", backendMedia)

            const result = await axios.post(`${serverUrl}/api/reel/upload`, formData, { withCredentials: true })

            console.log(result)
            toast.success(` Story Uploaded Successfully!`)
            setloading(false)
             dispatch(setReelData([...reelData , result.data]))
            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setloading(false)
        }
    }

    const handleSubmit = () => {

        if (uploadType === 'post') {
            uploadPost();
        }
        else if (uploadType === 'story') {
            uploadStory();
        }
        else {
            uploadReel();
        }
    }



    return (
        <div

            className='w-full min-h-screen overflow-y-auto flex flex-col items-center bg-slate-900'>

            {/* header section back button  */}
            <div
                className='cursor-pointer w-full  h-25 flex items-center gap-6 p-6 left-3 '
            >
                <ArrowLeft
                    onClick={() => { navigate('/') }}
                    className='w-10 h-10 text-gray-100' />

                <div>
                    <h1 className='text-gray-100 text-3xl font-semibold '> Upload Media</h1>
                </div>
            </div>

            {/* header div   */}

            <div className='w-[90%] max-w-150 h-25 rounded-full bg-gray-100 flex items-center  justify-around gap-10 text-2xl font-semibold'>
                <div
                    className={`w-[25%] h-[70%] flex items-center justify-center cursor-pointer ${uploadType === "post" ? "active-tab" : ""} `}
                    onClick={() => setUploadType("post")}
                >Post</div>

                <div
                    className={`w-[25%] h-[70%] flex items-center justify-center cursor-pointer  ${uploadType === "Reel" ? "active-tab" : ""} `}
                    onClick={() => setUploadType("Reel")}
                >Reel</div>


                <div
                    className={`w-[25%] h-[70%] flex items-center justify-center cursor-pointer ${uploadType === "Story" ? "active-tab" : ""} `}
                    onClick={() => setUploadType("Story")}
                >Story</div>
            </div>


            {/* upload section  */}

            {/* frontendMedia nhi aaya to ye div  */}

            {
                !frontendMedia && <div

                    className='w-[90%] max-w-200 bg-slate-600 h-80 mt-30 flex flex-col items-center justify-center gap-2 p-6 rounded-4xl hover:bg-linear-to-r from-gray-200 to-gray-600 '
                    onClick={() => {
                        mediaInput.current.click();
                    }}

                >
                    <input
                        hidden
                        ref={mediaInput}
                        type="file"
                        onChange={handleMedia}
                    />
                    <div>
                        <Plus
                            className='w-14 h-8 text-slate-900 text-4xl font-bold cursor-pointer' />
                    </div>
                    <h1 className='text-2xl font-semibold '> Upload {uploadType} </h1>
                </div>
            }

            {/* frontendMedia agaya to ye div  */}

            {
                frontendMedia && (
                    <div className='w-[90%] max-w-100 mt-20 flex flex-col gap-5'>

                        {/* Media Preview */}
                        <div className='w-full h-80 bg-slate-600 rounded-4xl overflow-hidden'>

                            {/* Image */}
                            {
                                mediaType === "image" && (
                                    <div className='w-full h-full'>
                                        <img
                                            className='w-full h-full object-cover'
                                            src={frontendMedia}
                                            alt="preview image"
                                        />
                                    </div>
                                )
                            }

                            {/* Video */}
                            {
                                mediaType === "video" && (
                                    <div className='w-full h-full'>
                                        <video
                                            className='w-full h-full object-cover'
                                            src={frontendMedia}
                                            controls
                                        />
                                    </div>
                                )
                            }

                        </div>


                        {/* Caption */}
                        {
                            uploadType != "Story" &&
                            <div className='w-full'>
                                <input
                                    className='w-full h-10 border-b-2 border-gray-100 outline-none text-gray-100 text-2xl py-3'
                                    placeholder='Write Caption'
                                    type='text'
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                />
                            </div>
                        }


                        {/* Submit Button */}
                        <div className='w-full h-10 flex items-center justify-center mt-6'>
                            <button
                                disabled={loading}
                                className='bg-gray-100 px-10 py-3 rounded-full text-2xl font-semibold hover:underline hover:bg-gray-300'
                                onClick={handleSubmit}
                            >
                                {
                                    loading ? <ClipLoader /> : `  Upload ${uploadType}`
                                }
                            </button>
                        </div>

                    </div>
                )
            }



        </div>
    )
}

export default Upload
