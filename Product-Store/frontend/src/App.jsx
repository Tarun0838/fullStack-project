import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'

const App = () => {
  return (
    <Box minH={'100vh'}  >
      <Navbar/>
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/create' element={ <CreatePage /> } />
      </Routes>
    </Box>
  )
}

export default App
