import {React, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { jokiApi } from '../../helpers/axios'



export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const nav= useNavigate()

  const handleSubmit= async (event) => {
    event.preventDefault()

    try {
      let response= await jokiApi({
        method: "POST",
        url: "/register",
        headers: {},
        data: {
          username, email, password
        }
      }) 
      nav('/login')
    }catch(error) {
      console.log(error, "<<<<< error register");
      
    }
  }
  console.log(username, email, password);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-16 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img
      className="mx-auto h-10 w-auto"
      src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company"
    />
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Register your account
    </h2>
  </div>
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6"  onSubmit={handleSubmit}>
      <div>
      <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Username
        </label>
        <div className="mt-2">
          <input
            
            
            required=""
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={username} onChange={e => setUsername(e.target.value)}
          />
        </div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required=""
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={email} onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required=""
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={password} onChange={e => setPassword(e.target.value)}
          />
        </div>
      </div>
      
        <div >
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          Register
        </button>
          </div>
      
    </form>
    <p className="mt-10 text-center text-sm text-gray-500">
      You have account? 
      <Link
        to="/login"
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        Sign in
      </Link>
    </p>
  </div>
</div>

  )
}
