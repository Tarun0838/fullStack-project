import React from 'react'
import LeftHome from '../components/LeftHome'
import CenterHome from '../components/CenterHome'
import RightHome from '../components/RightHome'

const Home = () => {
  return (
    <div className='w-full flex items-center justify-center'>
        {/* Home component basically 3 part mai divide hoga 
        left part mai profile and loggeduser ayenge
        right part mai messages 
        center mai feed ayegi  */}

        <LeftHome /> 
        <CenterHome /> 
        <RightHome /> 

    </div>
  )
}

export default Home
