import React from 'react'
import { useNavigate } from 'react-router-dom'

const Button = ({ btnName, btnRoute, onClick }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (btnRoute) {
      navigate(`/${btnRoute}`)
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className='min-w-20 cursor-pointer rounded-full px-14 py-3 bg-gray-100 text-slate-900 text-2xl font-semibold'
      >
        {btnName}
      </button>
    </div>
  )
}

export default Button