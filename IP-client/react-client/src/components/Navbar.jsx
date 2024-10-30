

import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className='h-16 bg-cyan-600 flex justify-between px-24 items-center fixed w-full'>
      <h1 className='text-xl font-bold tracking-wide'>JockKey</h1>
      <div className='space-x-6'>
        
        <Link className='hover:text-white'  to="">Service</Link>
        <Link className='hover:text-white'  to="/login">Sign In</Link>
      </div>
      <Link to="/register">
      <button className='border-indigo-700 border-2 px-4 py-2 rounded-full hover:bg-indigo-600 hover:text-white'>Join Now</button>
      </Link>
    </nav>
  )
}

