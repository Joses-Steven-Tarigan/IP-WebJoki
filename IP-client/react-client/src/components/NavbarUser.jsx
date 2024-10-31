

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavbarUser(){

  const navigate = useNavigate()

  const logout = ()=>{
    localStorage.removeItem("access_token")

    navigate("/")
  }

  return (
    <nav className='absolute h-16 bg-cyan-600 flex justify-between px-24 items-center w-full'>
      <Link to="/">
      <h1 className='text-xl font-bold tracking-wide'>JockKey</h1>
      </Link>
      <div className='space-x-6'>
        
        <Link className='hover:text-white'  to="/services">Service</Link>
        
      </div>
      
      <button className='border-indigo-700 border-2 px-4 py-2 rounded-full hover:bg-indigo-600 hover:text-white' onClick={logout}>
        Logout
      </button>
      
    </nav>
  )
}

