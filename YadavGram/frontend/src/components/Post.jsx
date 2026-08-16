import React from 'react'
import dp from '../assets/dp.jpg'
import { MessageCircle, ThumbsUp } from 'lucide-react';
import axios from 'axios';
import { serverUrl } from '../App';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setPostData } from '../redux/postSlice';

const Post = ({ postData }) => {

  const dispatch = useDispatch();
  const { postData: allPost } = useSelector(state => state.post)

  const handlelike = async () => {
    try {
      // yah likes to handle karenge
      const result = await axios.post(`${serverUrl}/api/post/likes/${postData?._id}`, {}, { withCredentials: true })

      console.log(result.data)


      // updated post Redux mein update karo
      const updatedPost = result.data;

      const updatedPosts = allPost.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );

      dispatch(setPostData(updatedPosts));

    } catch (error) {
      console.log("error in handle Like in post ", error)
      toast.error(error.response?.data?.message || "Something went wrong");

    }
  }
  const handleComment = async () => {

  }



  return (
    <div className='w-full  md:min-h-100 bg-gray-100 shadow-2xl shadow-gray-900  rounded-2xl flex flex-col items-center p-2'>

      {/* dp profile and follow button  */}
      <div className='w-full flex items-center justify-between p-4'>
        {/* dp and username  */}
        <div className=' flex  items-center justify-center gap-2 p-2 text-md text-slate-900'>

          {/* dp section  */}
          <div className=' w-12 h-12 md:w-12 md:h-12 rounded-full border-2 border-slate-800 cursor-pointer overflow-hidden '>
            <img
              className='w-full object-cover '
              src={postData.author?.profileImage || dp}
              alt="profile picture" />
          </div>

          <div>
            {postData?.author.username}
          </div>


        </div>


        {/* follow button */}
        <div className='w-18 md:w-24'>
          <button
            className='w-full cursor-pointer bg-indigo-700 py-2 px-4 text-md rounded-full '

          >follow
          </button>
        </div>

      </div>

      {/* post div  */}

      {
        postData?.mediaType === "image" &&
        <div className='w-[90%] aspect-square  overflow-hidden rounded-3xl bg-slate-800 flex items-center justify-center'>
          <img
            className='w-full h-full  object-cover'
            src={postData?.media} alt="post" />
        </div>
      }

      {/* Video */}
      {
        postData?.mediaType === "video" && (
          <div className='w-[90%] aspect-square  overflow-hidden rounded-3xl bg-slate-800 flex items-center justify-center'>
            <video
              className='w-full h-full object-cover'
              src={postData?.media}
              controls
            />
          </div>
        )
      }

      {/* like comment  */}

      <div className='w-full  flex items-center justify-between px-10 pt-2 '>

        {/* like */}

        <div className='w-20'>

          <button
            onClick={handlelike}
            className='w-full cursor-pointer  py-2 px-4 text-2xl rounded-full flex items-center justify-center gap-2 '

          >
            <ThumbsUp className='text-slate-900 text-xl font-bold' />
            <div className='text-md text-slate-900 md:text-2xl '> {postData?.likes.length} </div>
          </button>
        </div>

        {/* comment  */}

        <div className=''>
          <button
            onClick={handleComment}
            className='w-full text-center cursor-pointer  py-2 px-4 text-2xl rounded-full flex items-center justify-center gap-2 '

          >
            <MessageCircle className='text-slate-900 text-2xl font-bold' />
            <div className='text-md text-slate-900 md:text-2xl '> {postData?.comment.length} </div>
          </button>
        </div>

      </div>

      {/* caption  */}
      <div className='text-slate-900 w-full  flex items-start  gap-2 px-3 py-2  '>
        <h2 className='text-md font-semibold ml-3 shrink-0'> {postData?.author.username} </h2>
        <p className='min-w-0 wrap-break-word' > {postData?.caption} </p>
      </div>

    </div>
  )
}

export default Post
