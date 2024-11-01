import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { jokiApi } from '../../helpers/axios'




export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    const nav= useNavigate()
  
    const handleSubmit= async (event) => {
      event.preventDefault()
  
      try {
        let response= await jokiApi({
          method: "POST",
          url: "/login",
          headers: {},
          data: {
            email, password
          }
        })
        localStorage.setItem("access_token", response.data.access_token)
        nav('/services')
      }catch(error) {
        console.log(error, "Error dari Login");
        Swal.fire({
          title: `Error ${error.response.status}!`,
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Okay",
        });
        
      }
    }

    async function handleCredentialResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);
      const {data} = await jokiApi({
        method: "POST",
        url: "/google-login",
        headers: {
          token: response.credential,
        },
      })
      localStorage.setItem("access_token", data.access_token)
      nav('/services')
    }
    useEffect(() => {

      google.accounts.id.initialize({
        client_id: "264303005650-bj9ubgmelc8rba74ikjd8e1kjdprs91v.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    }, []);


  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-16 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Sign in to your account
    </h2>
  </div>
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
      <div>
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
      <div>
        
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          Sign in
        </button>
          
      </div>
      <div id="buttonDiv" className='justify-self-center'></div>

    </form>
    <p className="mt-10 text-center text-sm text-gray-500">
      Not have account ?
      <Link
        to="/register"
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        Register here
      </Link>
    </p>
  </div>
</div>


  )
}
